// AddPlacemark.js
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useYMaps } from "@pbe/react-yandex-maps";
import {
  addMarkerToDatabase,
  fetchMarkersByTheme,
  getMarkersFromDatabase,
  removeMarkerFromDB,
  checkDuplicateMarker,
  checkDuplicateMarkerCoords,
  getShareMarker,
} from "../../utils/endPointsHandlers";

import {
  getPlacemarkOptions,
  balloonContentTemplate,
  buildFunction,
  clearFunction,
} from "../../utils/placemarkOptions";

import useSelectedAddressChat from "../../utils/useSelectedAddressChat";
import useSearchButtonClickChat from "../../utils/useSearchButtonClickChat";
import useAddressSuggestionChat from "../../utils/useAddressSuggestionChat";

function AddPlacemark({
  mapStyle,
  onAddressChange,
  inputText,
  createMarker,
  selectedTheme,
  setSelectedTheme,
  setIsMarkerPlaced,
  searchButtonClick,
  searchInputRef,
  setSearchInput,
  showAllMarkers,
  setShowAllMarkers,
  setCheckDublicateMarkersMesage,
  setOpenAlert,
  setShowMessage,
}) {
  const ymaps = useYMaps();
  const mapRef = useRef(null);
  const myMapRef = useRef(null);
  const myPlacemarkRef = useRef(null);
  const currentCoords = useRef(null);
  const clustererRef = useRef(null);

  const checkIsDuplicateCoordsRef = useRef(null);

  const [selectedAddress, setselectedAddress] = useState("");
  const [checkIsDuplicateCoords, setCheckIsDuplicateCoords] = useState(0);
  const [shareMarkerId, setShareMarkerId] = useState(null);
  const [shareMarkerTheme, setShareMarkerTheme] = useState(null);

  // TODO: 1 начало
  const router = useRouter();

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

  //  для подсказок адреса
  useAddressSuggestionChat(
    ymaps,
    searchInputRef,
    selectedAddress,
    setselectedAddress,
    searchAddress
  );

  /////////  для установки значения адреса подсказок в  поле ввода адреса
  useSelectedAddressChat(selectedAddress, setSearchInput, ymaps);

  ///////// для поиска адреса по координатам
  useSearchButtonClickChat(searchButtonClick, searchAddress, ymaps);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // TODO: 2 id и theme из query
  // useEffect для получения  id и theme из query
  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      // query ещё не доступен, выходим из useEffect
      return;
    }

    let didCancel = false;

    const { theme, id } = router.query;

    if (!didCancel) {
      if (!theme || !id) {
        return;
      }
      setShareMarkerId(id);
      setShareMarkerTheme(theme);
    }

    return () => {
      didCancel = true;
    };
  }, [router.query, shareMarkerId, shareMarkerTheme]);

  // TODO: 3 загружена карта или нет
  // useEffect для проверки загружена карта или нет
  useEffect(() => {
    if (!ymaps) {
      return;
    }
    ymaps.ready().then(() => {
      setIsMapLoaded(true);
    });
  }, [ymaps]);

  // TODO: 4 балуна маркера
  // useEffect для открытия соответствующего балуна маркера
  useEffect(() => {
    if (!ymaps || !mapRef.current || !isMapLoaded) {
      return;
    }

    if (shareMarkerId) {
      getShareMarker(shareMarkerId)
        .then((marker) => {
          if (marker) {
            if (myMapRef.current && marker && marker.lat && marker.lng) {
              myMapRef.current.setCenter([marker.lat, marker.lng]);

              // Проверяем, существует ли clustererRef.current перед поиском маркера
              if (clustererRef.current) {
                // Получаем все маркеры из кластера
                let allMarkers = clustererRef.current.getGeoObjects();

                // Ищем маркер по ID
                let markerToOpen = allMarkers.find(
                  (m) => m.properties.get("id") === marker.id
                );

                // Открываем балун маркера
                if (markerToOpen) {
                  markerToOpen.balloon.open();
                }
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching marker: ", error);
          setOpenAlert(true);
        });
    }
  }, [shareMarkerId, ymaps, myMapRef.current, isMapLoaded]);

  // TODO: 5 перетаскиваемый маркер
  ///////// useEffect для добавления перетаскиваемого маркера и инициализации карты
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

  /////////  useEffect для извлечения маркеров на карту согласно // TODO: 6 выбранной теме
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
        const markerId = marker.id;
        const coords = [marker.lat, marker.lng];
        const theme = marker.theme;
        const message = marker.message_markers;

        //////
        // Создаем макет балуна с кнопкой "Удалить маркер"
        const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          balloonContentTemplate,
          {
            build: buildFunction,
            clear: clearFunction,
            onButtonClick: async function () {
              try {
                await removeMarkerFromDB(markerId);
                clustererRef.current.remove(addPlacemark);
              } catch (error) {
                console.error("Error deleting marker: ", error);
              }
            },
            onCloseButtonClick: function () {
              addPlacemark.balloon.close();
            },
            onShareButtonClick: async function () {
              // Получить ID маркера
              const markerId = addPlacemark.properties.get("id");

              if (typeof window !== "undefined") {
                try {
                  const markerData = await getShareMarker(markerId);
                  const theme = markerData.theme; // получаем тему маркера
                  const host_name = window.location.host;

                  // Создаем ссылку на маркер с темой
                  const url = `${host_name}/chat-na-karte?id=${markerId}&theme=${theme}`;

                  // Копировать ссылку в буфер обмена
                  navigator.clipboard.writeText(url).then(() => {});

                  setShowMessage("Маркер скопирован в буфер обмена");
                  // Копировать ссылку в буфер обмена
                  setTimeout(() => {
                    setShowMessage("");
                  }, 3000);
                } catch (error) {
                  console.error(
                    "Ошибка при получении информации о маркере: ",
                    error
                  );
                }
              }
            },
          }
        );

        const addPlacemark = new ymaps.Placemark(
          coords,
          {
            id: markerId,
            balloonContent: message,
            groupTheme: theme,
          },
          getPlacemarkOptions(MyBalloonContentLayout, ymaps)
        );

        clustererRef.current.add(addPlacemark);

        // Добавляем кластер на карту
        myMapRef.current.geoObjects.add(clustererRef.current);

        /////
      });
    });
    ////

    //////////////
  }, [selectedTheme, checkIsDuplicateCoords, ymaps]);

  //  useEffect для // TODO: 7 добавления нового маркера по кнопке Добавить маркер
  useEffect(() => {
    if (
      createMarker === 0 ||
      !myMapRef.current ||
      !ymaps ||
      !currentCoords.current
    ) {
      return;
    }

    // Проверка на дубликат
    checkDuplicateMarker(
      currentCoords.current[0],
      currentCoords.current[1],
      inputText
    )
      .then((isDuplicate) => {
        if (isDuplicate) {
          // Вывод сообщения пользователю
          setCheckDublicateMarkersMesage(
            "Маркер с этими координатами и сообщением уже существует"
          );
          setTimeout(() => {
            setCheckDublicateMarkersMesage("");
          }, 3000);
          return;
        }

        // Смещаем немного координаты маркера, чтобы он не совпадал с другими маркерами
        checkDuplicateMarkerCoords(
          currentCoords.current[0],
          currentCoords.current[1]
        ).then((isDuplicateCoords) => {
          //////////////////////////////
          if (isDuplicateCoords) {
            // Вывод сообщения пользователю
            setCheckDublicateMarkersMesage(
              "Маркер с этими координатами уже существует, добавляем с небольшим смещением"
            );

            const offset = 3 / 111320;
            currentCoords.current[0] += offset;
            currentCoords.current[1] += offset;

            checkIsDuplicateCoordsRef.current += 1;
            /* setCheckIsDuplicateCoords((prev) => prev + 1); */

            setTimeout(() => {
              setCheckDublicateMarkersMesage("");
            }, 3000);
          }

          // Если дубликат не обнаружен, добавляем новый маркер
          addMarkerToDatabase(
            currentCoords.current[0],
            currentCoords.current[1],
            selectedTheme,
            inputText
          ).then(({ id: markerId }) => {
            const MyBalloonContentLayout =
              ymaps.templateLayoutFactory.createClass(balloonContentTemplate, {
                build: buildFunction,
                clear: clearFunction,
                onButtonClick: async function () {
                  try {
                    await removeMarkerFromDB(markerId);
                    clustererRef.current.remove(addPlacemark);
                  } catch (error) {
                    console.error("Error deleting marker: ", error);
                  }
                },
                onCloseButtonClick: function () {
                  addPlacemark.balloon.close();
                },
                onShareButtonClick: async function () {
                  // Получить ID маркера
                  const markerId = addPlacemark.properties.get("id");

                  if (typeof window !== "undefined") {
                    try {
                      const markerData = await getShareMarker(markerId);
                      const theme = markerData.theme; // получаем тему маркера
                      const host_name = window.location.host;

                      // Создаем ссылку на маркер с темой
                      const url = `${host_name}/chat-na-karte?id=${markerId}&theme=${theme}`;

                      // Копировать ссылку в буфер обмена
                      navigator.clipboard.writeText(url).then(() => {});

                      setShowMessage("Маркер скопирован в буфер обмена");

                      setTimeout(() => {
                        setShowMessage("");
                      }, 3000);
                    } catch (error) {
                      console.error(
                        "Ошибка при получении информации о маркере: ",
                        error
                      );
                    }
                  }
                },
              });

            const addPlacemark = new ymaps.Placemark(
              currentCoords.current,
              {
                id: markerId,
                balloonContent: inputText,
                groupTheme: selectedTheme,
              },
              getPlacemarkOptions(MyBalloonContentLayout, ymaps)
            );

            clustererRef.current.add(addPlacemark);
            setCheckIsDuplicateCoords(checkIsDuplicateCoordsRef.current);
            ///////
          });
          //////////////////////////
        });
        ////
      })
      .catch((error) => {
        console.error("Error while checking for duplicate marker: ", error);
      });
  }, [createMarker, ymaps]);

  //////// useEffect для // TODO: 8 извлечения всех маркеров на карту
  useEffect(() => {
    if (showAllMarkers) {
      if (!ymaps) {
        return;
      }
      // Проверяем, существует ли clustererRef.current перед удалением маркеров
      if (clustererRef.current) {
        // Удаляем все маркеры из кластера
        clustererRef.current.removeAll();
      }

      getMarkersFromDatabase().then((markers) => {
        const markerPromises = markers.map((marker) => {
          const markerId = marker.id;
          const coords = [marker.lat, marker.lng];
          const theme = marker.theme;
          const message = marker.message_markers;

          //////
          // Создаем макет балуна с кнопкой "Удалить маркер"
          const MyBalloonContentLayout =
            ymaps.templateLayoutFactory.createClass(balloonContentTemplate, {
              build: buildFunction,
              clear: clearFunction,
              onButtonClick: async function () {
                try {
                  await removeMarkerFromDB(markerId);
                  clustererRef.current.remove(addPlacemark);
                } catch (error) {
                  console.error("Error deleting marker: ", error);
                }
              },
              onCloseButtonClick: function () {
                addPlacemark.balloon.close();
              },
              onShareButtonClick: async function () {
                // Получить ID маркера
                const markerId = addPlacemark.properties.get("id");

                if (typeof window !== "undefined") {
                  try {
                    const markerData = await getShareMarker(markerId);
                    const theme = markerData.theme; // получаем тему маркера
                    const host_name = window.location.host;

                    // Создаем ссылку на маркер с темой
                    const url = `${host_name}/chat-na-karte?id=${markerId}&theme=${theme}`;

                    // Копировать ссылку в буфер обмена
                    navigator.clipboard.writeText(url).then(() => {});

                    setShowMessage("Маркер скопирован в буфер обмена");

                    setTimeout(() => {
                      setShowMessage("");
                    }, 3000);
                  } catch (error) {
                    console.error(
                      "Ошибка при получении информации о маркере: ",
                      error
                    );
                  }
                }
              },
            });

          const addPlacemark = new ymaps.Placemark(
            coords,
            {
              id: markerId,
              balloonContent: message,
              groupTheme: theme,
            },
            getPlacemarkOptions(MyBalloonContentLayout, ymaps)
          );

          clustererRef.current.add(addPlacemark);

          // Добавляем кластер на карту
          myMapRef.current.geoObjects.add(clustererRef.current);

          /*  myMapRef.current.geoObjects.add(addPlacemark); */
          /////
        });
        ////
        setShowAllMarkers(false);
        setSelectedTheme("");
      });
    }
  }, [showAllMarkers]);

  return <div ref={mapRef} className={mapStyle} />;
}

export default AddPlacemark;
