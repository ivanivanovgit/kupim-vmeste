// RouteMap.js
import { useRef, useEffect, useState } from "react";
import { useYMaps } from "@pbe/react-yandex-maps";
import { getRoutes } from "../../utils/asyncFunctions";

function RouteMap({
  mapStyle,
  countMapRoute,
  setFirstPoint,
  setSecondPoint,
  firstPointRef,
  secondPointRef,
  setMessageFirstPoint,
  setErrorMessage,
}) {
  const ymaps = useYMaps();
  const mapRef = useRef(null);
  const myMapRef = useRef(null);
  const [selectedFirstAddress, setSelectedFirstAddress] = useState("");
  const [selectedSecondAddress, setSelectedSecondAddress] = useState("");

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const routesFromServer = await getRoutes();
      setRoutes(routesFromServer);
    };

    fetchRoutes();
  }, []);

  ///////// useEffect для инициализации карты
  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    ymaps.ready(() => {
      const myMap = new ymaps.Map(mapRef.current, {
        center: [55.755864, 37.617698],
        zoom: 10,
      });

      myMapRef.current = myMap;

      const searchControl = myMap.controls.get("searchControl");
      searchControl.options.set("noPlacemark", "true");

      routes.forEach((route) => {
        const firstCoords = [route.first_latitude, route.first_longitude];
        const secondCoords = [route.second_latitude, route.second_longitude];
        const routeMessage = route.route_message;

        const multiRoute = new ymaps.multiRouter.MultiRoute(
          {
            referencePoints: [firstCoords, secondCoords],
            params: { routingMode: "auto", results: 1 },
          },
          {
            // Отключаем видимость маркеров пути
            wayPointVisible: false,
          }
        );

        myMapRef.current.geoObjects.add(multiRoute);

        // создаем Placemark для первой и второй точки маршрута
        const firstPlacemark = new ymaps.Placemark(firstCoords, {
          balloonContent: routeMessage,
        });
        const secondPlacemark = new ymaps.Placemark(secondCoords, {
          balloonContent: routeMessage,
        });

        // добавляем Placemark на карту
        myMapRef.current.geoObjects.add(firstPlacemark);
        myMapRef.current.geoObjects.add(secondPlacemark);
      });

      return () => {
        if (myMapRef.current) {
          myMapRef.current.destroy();
        }
      };
    });

    ///////
  }, [ymaps]);

  //useEffect для добавления маршрута
  useEffect(() => {
    if (countMapRoute === 0 || !myMapRef.current || !ymaps) {
      return;
    }

    ymaps.ready(() => {
      Promise.all([
        ymaps.geocode(setFirstPoint.value),
        ymaps.geocode(setSecondPoint.value),
      ])
        .then((results) => {
          const firstGeoObject = results[0].geoObjects.get(0);
          const secondGeoObject = results[1].geoObjects.get(0);

          if (!firstGeoObject) {
            setErrorMessage(
              `Адрес "${setFirstPoint.value}" не найден. Проверьте правильность введенного адреса.`
            );
            return;
          }
          if (!secondGeoObject) {
            setErrorMessage(
              `Адрес "${setSecondPoint.value}" не найден. Проверьте правильность введенного адреса.`
            );
            return;
          }
          // Сбрасываем сообщение об ошибке, если маршрут успешно обработан
          setErrorMessage("");

          const firstCoords = firstGeoObject.geometry.getCoordinates();
          const secondCoords = secondGeoObject.geometry.getCoordinates();

          if (
            !Array.isArray(firstCoords) ||
            firstCoords.length !== 2 ||
            !Array.isArray(secondCoords) ||
            secondCoords.length !== 2
          ) {
            setErrorMessage("Произошла ошибка при геокодировании адресов: ");
            return;
          }

          const route = new ymaps.multiRouter.MultiRoute(
            {
              referencePoints: [firstCoords, secondCoords],
              params: {
                routingMode: "auto",
                results: 1, // Отображаем только один маршрут
              },
            },
            {
              // Отключаем видимость маркеров пути
              wayPointVisible: false,
            }
          );

          myMapRef.current.geoObjects.add(route);

          // Создаем макет балуна с кнопкой "Удалить маркер"
          const MyBalloonContentLayout =
            ymaps.templateLayoutFactory.createClass(
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
                  closeButton.addEventListener(
                    "click",
                    this.onCloseButtonClick
                  );
                },
                clear: function () {
                  const button = this.getParentElement().querySelector(
                    "#delete-marker-button"
                  );
                  button.removeEventListener("click", this.onButtonClick);

                  const closeButton = this.getParentElement().querySelector(
                    ".custom-orange-balloon__close"
                  );
                  closeButton.removeEventListener(
                    "click",
                    this.onCloseButtonClick
                  );

                  MyBalloonContentLayout.superclass.clear.call(this);
                },
                onButtonClick: function () {
                  myMapRef.current.geoObjects.remove(firstPlacemark);
                  myMapRef.current.geoObjects.remove(secondPlacemark);
                  myMapRef.current.geoObjects.remove(route);
                },
                onCloseButtonClick: function () {
                  firstPlacemark.balloon.close();
                  secondPlacemark.balloon.close();
                },
              }
            );
          ///////

          const firstPlacemark = new ymaps.Placemark(
            firstCoords,
            {
              balloonContent: setMessageFirstPoint.value,
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

          const secondPlacemark = new ymaps.Placemark(
            secondCoords,
            {
              balloonContent: setMessageFirstPoint.value,
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

          myMapRef.current.geoObjects.add(firstPlacemark);
          myMapRef.current.geoObjects.add(secondPlacemark);

          // Центр карты по координатам первой точки
          myMapRef.current.setCenter(firstCoords);
        })
        .catch((error) => {
          setErrorMessage(
            "Произошла ошибка при геокодировании адресов: " + error
          );
        });
    });
  }, [countMapRoute, ymaps]);

  // useEffect для подсказок адреса firstPoint
  useEffect(() => {
    if (!ymaps || !firstPointRef) {
      return;
    }

    // Создаем SuggestView для поля ввода адреса
    const suggestView = new ymaps.SuggestView(firstPointRef);

    // Обрабатываем выбор подсказки
    suggestView.events.add("select", (e) => {
      // Получаем выбранный адрес
      setSelectedFirstAddress(e.get("item").value);
    });
  }, [ymaps, firstPointRef]);

  ///////// useEffect для установки значения адреса подсказок в  поле ввода адреса firstPoint
  useEffect(() => {
    if (selectedFirstAddress) {
      /// Устанавливаем значение поля ввода адреса
      setFirstPoint.onChange(selectedFirstAddress);
    }
  }, [selectedFirstAddress, ymaps]);

  // useEffect для подсказок адреса secondPoint
  useEffect(() => {
    if (!ymaps || !secondPointRef) {
      return;
    }

    // Создаем SuggestView для поля ввода адреса
    const suggestView = new ymaps.SuggestView(secondPointRef);

    // Обрабатываем выбор подсказки
    suggestView.events.add("select", (e) => {
      // Получаем выбранный адрес
      setSelectedSecondAddress(e.get("item").value);
    });
  }, [ymaps, secondPointRef]);

  ///////// useEffect для установки значения адреса подсказок в  поле ввода адреса secondPoint
  useEffect(() => {
    if (selectedSecondAddress) {
      /// Устанавливаем значение поля ввода адреса
      setSecondPoint.onChange(selectedSecondAddress);
    }
  }, [selectedSecondAddress, ymaps]);

  ////////////
  return <div ref={mapRef} className={mapStyle} />;
}

export default RouteMap;
