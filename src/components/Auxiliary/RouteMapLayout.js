// RouteMapLayout.js
import React, { useState, useRef } from "react";
import { useForm, useController } from "react-hook-form";

function RouteMapLayout({ mapRoute, layoutStyles }) {
  const [countMapRoute, setCountMapRoute] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const firstPointRef = useRef(null);
  const secondPointRef = useRef(null);

  const { control, handleSubmit } = useForm();

  const { field: setFirstPoint } = useController({
    name: "firstPoint",
    control,
    defaultValue: "",
  });

  const { field: setMessageFirstPoint } = useController({
    name: "messageFirstPoint",
    control,
    defaultValue: "",
  });

  const { field: setSecondPoint } = useController({
    name: "secondPoint",
    control,
    defaultValue: "",
  });

  const { field: setMessageSecondPoint } = useController({
    name: "messageSecondPoint",
    control,
    defaultValue: "",
  });

  const handleFormAddRoute = (data) => {
    if (data) {
      setCountMapRoute((prev) => prev + 1);
    }
  };

  const mapRouteWithProps = React.cloneElement(mapRoute, {
    countMapRoute: countMapRoute,
    setFirstPoint: setFirstPoint,
    setSecondPoint: setSecondPoint,
    firstPointRef: firstPointRef.current,
    secondPointRef: secondPointRef.current,
    setMessageFirstPoint: setMessageFirstPoint,
    setMessageSecondPoint: setMessageSecondPoint,
    setErrorMessage: setErrorMessage,
  });

  return (
    <div className={layoutStyles.wrapper}>
      <div className={layoutStyles.leftSide}>
        <div className={layoutStyles.RouteWrapper}>
          <div className={layoutStyles.RouteLabel}>
            Добавьте маршрут на карту
          </div>
          {/* Форма для добавления маршрутов */}
          <form onSubmit={handleSubmit(handleFormAddRoute)}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.routeInput}`}
              {...setFirstPoint}
              ref={(e) => {
                setFirstPoint.ref(e);
                firstPointRef.current = e;
              }}
              placeholder="&nbsp;&nbsp;&nbsp;Введите адрес первой точки маршрута"
              pattern="^[^<>]+$"
              title="Пожалуйста, введите адрес первой точки маршрута"
              required
            />
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.routeInput}`}
              {...setMessageFirstPoint}
              placeholder="&nbsp;&nbsp;&nbsp;Введите сообщение для первой точки маршрута"
              pattern="^[^<>]+$"
              title="Пожалуйста, введите сообщение для первой точки маршрута"
              required
            />
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.routeInput}`}
              {...setSecondPoint}
              ref={(e) => {
                setSecondPoint.ref(e);
                secondPointRef.current = e;
              }}
              placeholder="&nbsp;&nbsp;&nbsp;Введите адрес второй точки маршрута"
              pattern="^[^<>]+$"
              title="Пожалуйста, введите адрес второй точки маршрута"
              required
            />
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.routeInput}`}
              {...setMessageSecondPoint}
              placeholder="&nbsp;&nbsp;&nbsp;Введите сообщение для второй точки маршрута"
              pattern="^[^<>]+$"
              title="Пожалуйста, введите сообщение для второй точки маршрута"
              required
            />
            <button className={layoutStyles.mainButtonStyle} type="submit">
              Добавить маршрут на карту c сообщениями
            </button>
          </form>
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      </div>
      <div className={layoutStyles.rightSide}>
        <div className={layoutStyles.forMap}>{mapRouteWithProps}</div>
      </div>
    </div>
  );
}

export default RouteMapLayout;
