// AddPlacemark.js
import { useRef, useEffect, useState } from "react";
import { useYMaps } from "@pbe/react-yandex-maps";
import {
  addMarkerToDatabase,
  fetchMarkersByTheme,
  getMarkersFromDatabase,
} from "../../utils/asyncFunctions";

function AddPlacemark({
  mapStyle,
  onAddressChange,
  inputText,
  createMarker,
  selectedTheme,
  setIsMarkerPlaced,
  searchButtonClick,
  searchInputRef,
  setSearchInput,
}) {
  const ymaps = useYMaps();
  const mapRef = useRef(null);
  const myMapRef = useRef(null);
  const myPlacemarkRef = useRef(null);
  const currentCoords = useRef(null);
  const clustererRef = useRef(null);

  const [selectedAddress, setselectedAddress] = useState("");

  let MyIconContentLayout;

  if (ymaps) {
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="min-width: 10rem; text-align: left;">$[properties.iconCaption]</div>'
    );
  }
  // функция для создания метки
  function createPlacemark(coords) {
    const placemark = new ymaps.Placemark(
      coords,
      {
        ///
        /*  iconCaption: "Поиск...", */
        ///
      },
      {
        ///
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: "default#imageWithContent",
        // Своё изображение иконки метки.
        iconImageHref: "images/marker.png",
        // Размеры метки.
        iconImageSize: [30, 43],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-18, -43],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [35, -10],
        // Макет содержимого.
        iconContentLayout: MyIconContentLayout,
        ///
      }
    );
    myPlacemarkRef.current = placemark;
  }

  // Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords, myPlacemark) {
    if (!myPlacemark) {
      return;
    }
    /*  myPlacemark.properties.set("iconCaption", "Поиск..."); */
    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);

      const address = [
        firstGeoObject.getLocalities().length
          ? firstGeoObject.getLocalities()
          : firstGeoObject.getAdministrativeAreas(),
        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise() || "",
      ]
        .filter(Boolean) // <-- Фильтруем все значения, которые не являются true
        .join(", ");

      myPlacemark.properties.set({
        // Формируем строку с данными об объекте.
        iconCaption: address,
      });

      if (typeof onAddressChange === "function" && !selectedAddress) {
        onAddressChange(address);
      }
      if (typeof setIsMarkerPlaced === "function") {
        setIsMarkerPlaced(true);
      }
    });
  }

  //  Функция для поиска адреса
  const searchAddress = async (address) => {
    if (!ymaps || !myMapRef.current || !address) {
      return;
    }

    const searchResults = await ymaps.geocode(address);
    const firstResult = searchResults.geoObjects.get(0);

    if (firstResult) {
      const coords = firstResult.geometry.getCoordinates();
      currentCoords.current = coords;

      if (myPlacemarkRef.current) {
        myPlacemarkRef.current.geometry.setCoordinates(coords);
      } else {
        createPlacemark(coords);
        myMapRef.current.geoObjects.add(myPlacemarkRef.current);
      }

      getAddress(coords, myPlacemarkRef.current);
      onAddressChange(address);
      // Центрирование карты на найденных координатах
      myMapRef.current.setCenter(coords, myMapRef.current.getZoom(), {
        duration: 500,
      });
    }
  };

  // useEffect для подсказок адреса
  useEffect(() => {
    if (!ymaps || !searchInputRef) {
      return;
    }

    // Создаем SuggestView для поля ввода адреса
    const suggestView = new ymaps.SuggestView(searchInputRef);

    // Обрабатываем выбор подсказки
    suggestView.events.add("select", (e) => {
      // Получаем выбранный адрес
      setselectedAddress(e.get("item").value);

      // Вызываем функцию searchAddress, которая обрабатывает поиск адреса на карте
      if (typeof searchAddress === "function") {
        searchAddress(selectedAddress);
      }
    });
  }, [ymaps, searchInputRef]);

  ///////// useEffect для установки значения адреса подсказок в  поле ввода адреса
  useEffect(() => {
    if (selectedAddress) {
      setSearchInput(selectedAddress); // Устанавливаем значение поля ввода адреса
    }
    /*  console.log("selectedAddress", selectedAddress); */
  }, [selectedAddress, ymaps]);

  ///////// useEffect для поиска адреса по координатам
  useEffect(() => {
    if (searchButtonClick) {
      searchAddress(searchButtonClick);
    }
  }, [searchButtonClick, ymaps]);

  ///////// TODO: useEffect для добавления перетаскиваемого маркера и инициализации карты
  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const myMap = new ymaps.Map(mapRef.current, {
      center: [55.755864, 37.617698],
      zoom: 10,
    });

    myMapRef.current = myMap;

    const searchControl = myMap.controls.get("searchControl");
    searchControl.options.set("noPlacemark", "true");

    // Создаем кластер
    clustererRef.current = new ymaps.Clusterer({
      preset: "islands#orangeClusterIcons",
    });
    // Добавляем кластер на карту
    myMapRef.current.geoObjects.add(clustererRef.current);

    // Слушаем клик на карте.
    myMap.events.add("click", function (e) {
      let coords = e.get("coords");
      currentCoords.current = coords;

      if (myPlacemarkRef.current) {
        myPlacemarkRef.current.geometry.setCoordinates(coords);
      } else {
        createPlacemark(coords);
        myMapRef.current.geoObjects.add(myPlacemarkRef.current);
      }

      getAddress(coords, myPlacemarkRef.current);
    });

    return () => {
      if (myMapRef.current) {
        myMapRef.current.destroy();
      }
    };
    ///////
  }, [ymaps]);

  ///////// TODO: useEffect для извлечения маркеров на карту согласно выбранной теме
  useEffect(() => {
    if (!ymaps) {
      return;
    }
    // Проверяем, существует ли clustererRef.current перед удалением маркеров
    if (clustererRef.current) {
      // Удаляем все маркеры из кластера
      clustererRef.current.removeAll();
    }

    ////
    // Получаем маркеры из базы данных
    fetchMarkersByTheme(selectedTheme).then((markers) => {
      const markerPromises = markers.map((marker) => {
        const coords = [marker.lat, marker.lng];
        const theme = marker.theme;
        const message = marker.message_markers;

        /*   console.log("coords", coords);
        console.log("theme", theme);
        console.log("message", message); */
        //////
        // Создаем макет балуна с кнопкой "Удалить маркер"
        const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div class="custom-balloon">' +
            "$[properties.balloonContent]" +
            '<div class="button-delete-marker"><button id="delete-marker-button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Удалить &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></div>' +
            '<div class="custom-orange-balloon__close">&times;</div>' +
            "</div>",
          {
            build: function () {
              MyBalloonContentLayout.superclass.build.call(this);
              const button = this.getParentElement().querySelector(
                "#delete-marker-button"
              );
              button.addEventListener("click", this.onButtonClick);

              const closeButton = this.getParentElement().querySelector(
                ".custom-orange-balloon__close"
              );
              closeButton.addEventListener("click", this.onCloseButtonClick);
            },
            clear: function () {
              const button = this.getParentElement().querySelector(
                "#delete-marker-button"
              );
              button.removeEventListener("click", this.onButtonClick);

              const closeButton = this.getParentElement().querySelector(
                ".custom-orange-balloon__close"
              );
              closeButton.removeEventListener("click", this.onCloseButtonClick);

              MyBalloonContentLayout.superclass.clear.call(this);
            },
            onButtonClick: function () {
              /*  myMapRef.current.geoObjects.remove(addPlacemark); */
              clustererRef.current.remove(addPlacemark);
            },
            onCloseButtonClick: function () {
              addPlacemark.balloon.close();
            },
          }
        );

        const addPlacemark = new ymaps.Placemark(
          coords,
          {
            balloonContent: message,
            groupTheme: theme,
          },
          {
            // balloon settings
            balloonLayout: "default#imageWithContent",
            balloonAutoPan: true,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
            balloonOffset: [18, -90],
            balloonContentLayout: MyBalloonContentLayout,
            balloonCloseButton: false,

            /// icon settings
            iconLayout: "default#image",
            iconImageHref: "images/Orangemarker.png",
            iconImageSize: [30, 43],
            iconImageOffset: [-18, -43],
            iconContentLayout: ymaps.templateLayoutFactory.createClass(
              "<div>$[properties.iconContent]</div>"
            ),
            ///
          }
        );

        clustererRef.current.add(addPlacemark);

        // Добавляем кластер на карту
        myMapRef.current.geoObjects.add(clustererRef.current);

        /*  myMapRef.current.geoObjects.add(addPlacemark); */
        /////
      });
    });
    ////

    //////////////
  }, [selectedTheme, ymaps]);

  //  TODO: useEffect для добавления нового маркера по кнопке Добавить маркер
  useEffect(() => {
    if (
      createMarker === 0 ||
      !myMapRef.current ||
      !ymaps ||
      !currentCoords.current
    ) {
      return;
    }

    /*    console.log("currentCoords.current[0]", currentCoords.current[0]);
    console.log("currentCoords.current[1]", currentCoords.current[1]);
    console.log("selectedTheme", selectedTheme);
    console.log("inputText", inputText); */

    addMarkerToDatabase(
      currentCoords.current[0],
      currentCoords.current[1],
      selectedTheme,
      inputText
    ).then(() => {
      // Создаем макет балуна с кнопкой "Удалить маркер"
      const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="custom-balloon">' +
          "$[properties.balloonContent]" +
          '<div class="button-delete-marker"><button id="delete-marker-button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Удалить &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></div>' +
          '<div class="custom-orange-balloon__close">&times;</div>' +
          "</div>",
        {
          build: function () {
            MyBalloonContentLayout.superclass.build.call(this);
            const button = this.getParentElement().querySelector(
              "#delete-marker-button"
            );
            button.addEventListener("click", this.onButtonClick);

            const closeButton = this.getParentElement().querySelector(
              ".custom-orange-balloon__close"
            );
            closeButton.addEventListener("click", this.onCloseButtonClick);
          },
          clear: function () {
            const button = this.getParentElement().querySelector(
              "#delete-marker-button"
            );
            button.removeEventListener("click", this.onButtonClick);

            const closeButton = this.getParentElement().querySelector(
              ".custom-orange-balloon__close"
            );
            closeButton.removeEventListener("click", this.onCloseButtonClick);

            MyBalloonContentLayout.superclass.clear.call(this);
          },
          onButtonClick: function () {
            /*  myMapRef.current.geoObjects.remove(addPlacemark); */
            clustererRef.current.remove(addPlacemark);
          },
          onCloseButtonClick: function () {
            addPlacemark.balloon.close();
          },
        }
      );

      const addPlacemark = new ymaps.Placemark(
        currentCoords.current,
        {
          balloonContent: inputText,
          groupTheme: selectedTheme,
        },
        {
          // balloon settings
          balloonLayout: "default#imageWithContent",
          balloonAutoPan: true,
          balloonPanelMaxMapArea: 0,
          hideIconOnBalloonOpen: false,
          balloonOffset: [18, -90],
          balloonContentLayout: MyBalloonContentLayout,
          balloonCloseButton: false,

          /// icon settings
          iconLayout: "default#image",
          iconImageHref: "images/Orangemarker.png",
          iconImageSize: [30, 43],
          iconImageOffset: [-18, -43],
          iconContentLayout: ymaps.templateLayoutFactory.createClass(
            "<div>$[properties.iconContent]</div>"
          ),
          ///
        }
      );

      /*  myMapRef.current.geoObjects.add(addPlacemark); */
      clustererRef.current.add(addPlacemark);

      ///////
    });
    /*  if (typeof addMarker === "function") {
      addMarker(selectedTheme, currentCoords.current, inputText);
    } */
  }, [createMarker, ymaps]);

  return <div ref={mapRef} className={mapStyle} />;
}

export default AddPlacemark;
