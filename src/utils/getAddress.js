// getAddress.js

// Определяем адрес по координатам (обратное геокодирование).
export function getAddress(
  ymaps,
  coords,
  myPlacemark,
  onAddressChange,
  selectedAddress,
  setIsMarkerPlaced
) {
  if (!myPlacemark) {
    return;
  }

  ymaps.geocode(coords).then(function (res) {
    var firstGeoObject = res.geoObjects.get(0);

    const address = [
      firstGeoObject.getLocalities().length
        ? firstGeoObject.getLocalities()
        : firstGeoObject.getAdministrativeAreas(),
      firstGeoObject.getThoroughfare() || firstGeoObject.getPremise() || "",
    ]
      .filter(Boolean)
      .join(", ");

    myPlacemark.properties.set({
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
