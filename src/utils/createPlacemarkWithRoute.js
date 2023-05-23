// createPlacemarkWithRoute.js

export const createPlacemark = (coords, balloonContent) => {
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

  return new ymaps.Placemark(
    coords,
    {
      balloonContent: balloonContent,
    },
    {
      balloonLayout: "default#imageWithContent",
      balloonAutoPan: true,
      balloonPanelMaxMapArea: 0,
      hideIconOnBalloonOpen: false,
      balloonOffset: [18, -90],
      balloonContentLayout: MyBalloonContentLayout,
      balloonCloseButton: false,
      iconLayout: "default#image",
      iconImageHref: "images/Orangemarker.png",
      iconImageSize: [30, 43],
      iconImageOffset: [-18, -43],
      iconContentLayout: ymaps.templateLayoutFactory.createClass(
        "<div>$[properties.iconContent]</div>"
      ),
    }
  );
};
