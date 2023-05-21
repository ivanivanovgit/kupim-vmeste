// TabDisplayingPointsOnMap.js
import { useRef, useEffect } from "react";
import { useYMaps } from "@pbe/react-yandex-maps";

const createTabDisplayingPointsOnMap = (idTabMap) => {
  /* const idTab = tabMapName; ////// number of tab */

  function TabDisplayingPointsOnMap({ markers, st }) {
    const mapRef = useRef(null);
    const ymaps = useYMaps();

    useEffect(() => {
      if (!ymaps || !mapRef.current || markers.length == 0) {
        return;
      }

      const myMap = new ymaps.Map(mapRef.current, {
        center: markers[0].coords,
        zoom: 12,
      });

      const searchControl = myMap.controls.get("searchControl");
      searchControl.options.set("noPlacemark", "true");
      ////
      const clusterer = new ymaps.Clusterer({
        preset: "islands#lightBlueClusterIcons",
      });
      ////

      const filteredMarkers = markers.filter(
        (marker) => marker.idTab === idTabMap
      );

      filteredMarkers.forEach(({ coords, ...markerOptions }) => {
        const marker = new ymaps.Placemark(coords, markerOptions, {
          /// balloon settings
          balloonLayout: "default#imageWithContent",
          balloonAutoPan: true,
          balloonPanelMaxMapArea: 0,
          hideIconOnBalloonOpen: false,
          balloonOffset: [18, -90],

          balloonContentLayout: ymaps.templateLayoutFactory.createClass(
            '<div class="custom-balloon">' +
              "$[properties.balloonContent]" +
              '<div class="custom-balloon__close">&times;</div>' +
              "</div>",
            {
              build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = this.getParentElement().querySelector(
                  ".custom-balloon__close"
                );
                this._$element.addEventListener(
                  "click",
                  this.onCloseClick.bind(this),
                  { once: true }
                );
              },
              onCloseClick: function (e) {
                e.preventDefault();
                this.events.fire("userclose");
              },
            }
          ),
          /// icon settings
          iconLayout: "default#image",
          iconImageHref: "images/marker.png",
          iconImageSize: [30, 43],
          iconImageOffset: [-18, -43],
          iconContentLayout: ymaps.templateLayoutFactory.createClass(
            "<div>$[properties.iconContent]</div>"
          ),
          ///
        });

        // Добавляем коллекцию меток в кластеризатор
        clusterer.add(marker);
        ///
        /*  myMap.geoObjects.add(marker); */
      });

      ////
      myMap.geoObjects.add(clusterer);
      ///
      if (idTabMap === 1) {
        ///
        // Создание маркера Росторф
        let myPlacemark = new ymaps.Placemark(
          [55.365, 36.16],
          {
            balloonContent:
              'Росторф - торфяной карьер в ЦЗ <br></br> <a href="https://www.rostorf.com">www.rostorf.com</a>', // текст балуна при клике на маркер
          },
          {
            /// balloon settings
            balloonLayout: "default#imageWithContent",
            balloonAutoPan: true,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
            balloonOffset: [18, -120],

            balloonContentLayout: ymaps.templateLayoutFactory.createClass(
              '<div class="custom-balloon">' +
                "$[properties.balloonContent]" +
                '<div class="custom-balloon__close">&times;</div>' +
                "</div>",
              {
                build: function () {
                  this.constructor.superclass.build.call(this);
                  this._$element = this.getParentElement().querySelector(
                    ".custom-balloon__close"
                  );
                  this._$element.addEventListener(
                    "click",
                    this.onCloseClick.bind(this),
                    { once: true }
                  );
                },
                onCloseClick: function (e) {
                  e.preventDefault();
                  this.events.fire("userclose");
                },
              }
            ),
            /// icon settings
            iconLayout: "default#image",
            iconImageHref: "images/rtMarker.png",
            iconImageSize: [30, 43],
            iconImageOffset: [-18, -43],
            iconContentLayout: ymaps.templateLayoutFactory.createClass(
              "<div>$[properties.iconContent]</div>"
            ),
            ///
          }
        );

        // Добавление маркера на карту
        myMap.geoObjects.add(myPlacemark);
        ///
      }
      ///
    }, [ymaps, markers]);

    return <div ref={mapRef} className={st} />;
  }

  return TabDisplayingPointsOnMap;
};

const TabDisplayingPointsOnMap = ({ markers, st, activeTab }) => {
  let TabMap = null;

  for (let i = 1; i <= activeTab; i++) {
    TabMap = createTabDisplayingPointsOnMap(i);
  }

  return <TabMap markers={markers} st={st} />;
};

export default TabDisplayingPointsOnMap;
