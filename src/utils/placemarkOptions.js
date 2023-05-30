// placemarkOptions.js
export const balloonContentTemplate = `
  <div class="custom-balloon">
    $[properties.balloonContent]
    <div class="button-delete-marker">
      <button id="delete-marker-button">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Удалить
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
    </div>
    <div class="custom-orange-balloon__close">&times;</div>
  </div>
`;

export function buildFunction() {
  this.constructor.superclass.build.call(this);

  const button = this.getParentElement().querySelector("#delete-marker-button");
  button.addEventListener("click", this.onButtonClick);

  const closeButton = this.getParentElement().querySelector(
    ".custom-orange-balloon__close"
  );
  closeButton.addEventListener("click", this.onCloseButtonClick);
}

export function clearFunction() {
  const button = this.getParentElement().querySelector("#delete-marker-button");
  button.removeEventListener("click", this.onButtonClick);

  const closeButton = this.getParentElement().querySelector(
    ".custom-orange-balloon__close"
  );
  closeButton.removeEventListener("click", this.onCloseButtonClick);

  this.constructor.superclass.clear.call(this);
}

export function getPlacemarkOptions(MyBalloonContentLayout, ymaps) {
  return {
    // balloon settings
    balloonLayout: "default#imageWithContent",
    balloonAutoPan: true,
    balloonPanelMaxMapArea: 0,
    hideIconOnBalloonOpen: false,
    balloonOffset: [18, -90],
    balloonContentLayout: MyBalloonContentLayout,
    balloonCloseButton: false,

    // icon settings
    iconLayout: "default#image",
    iconImageHref: "images/Orangemarker.png",
    iconImageSize: [30, 43],
    iconImageOffset: [-18, -43],
    iconContentLayout: ymaps.templateLayoutFactory.createClass(
      "<div>$[properties.iconContent]</div>"
    ),
  };
}
