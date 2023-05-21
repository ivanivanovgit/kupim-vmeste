// RouteMapLayout.js
import React, { useState, useRef } from "react";
import { useForm, useController } from "react-hook-form";

function RouteMapLayout({ mapRoute, layoutStyles }) {
  const [countMapRoute, setCountMapRoute] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const firstPointRef = useRef(null);
  const secondPointRef = useRef(null);

  const { control, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const {
    field: { ref: setFirstPointRef, ...setFirstPoint },
    fieldState: { error: setFirstPointError },
  } = useController({
    name: "firstPoint",
    control,
    rules: { required: "Введите адрес первой точки маршрута" },
    defaultValue: "",
  });

  const {
    field: { ref: setMessageFirstPointRef, ...setMessageFirstPoint },
    fieldState: { error: setMessageFirstPointError },
  } = useController({
    name: "messageFirstPoint",
    control,
    rules: { required: "Введите сообщение для первой точки маршрута" },
    defaultValue: "",
  });

  const {
    field: { ref: setSecondPointRef, ...setSecondPoint },
    fieldState: { error: setSecondPointError },
  } = useController({
    name: "secondPoint",
    control,
    rules: { required: "Введите адрес второй точки маршрута" },
    defaultValue: "",
  });

  const {
    field: { ref: setMessageSecondPointRef, ...setMessageSecondPoint },
    fieldState: { error: setMessageSecondPointError },
  } = useController({
    name: "messageSecondPoint",
    control,
    rules: { required: "Введите сообщение для второй точки маршрута" },
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
            <div className={layoutStyles.firstPointInput}>
              <input
                className={`${layoutStyles.mainInput} ${layoutStyles.routeInput}`}
                {...setFirstPoint}
                ref={(e) => {
                  setFirstPointRef(e);
                  firstPointRef.current = e;
                }}
                placeholder="&nbsp;&nbsp;&nbsp;Введите адрес первой точки маршрута"
                pattern="^[^<>]+$"
                title="Пожалуйста, не используйте символы ^[^<>]+$ в адресе первой точки маршрута"
              />
              {setFirstPointError && (
                <div className={layoutStyles.warning}>
                  {setFirstPointError.message}
                </div>
              )}
            </div>
            <div className={layoutStyles.firstPointMessageInput}>
              <input
                className={`${layoutStyles.mainInput} ${layoutStyles.routeInput}`}
                {...setMessageFirstPoint}
                ref={(e) => {
                  setMessageFirstPointRef(e);
                }}
                placeholder="&nbsp;&nbsp;&nbsp;Введите сообщение для первой точки маршрута"
                pattern="^[^<>]+$"
                title="Пожалуйста, не используйте символы ^[^<>]+$ в сообщении для первой точки маршрута"
              />
              {setMessageFirstPointError && (
                <div className={layoutStyles.warning}>
                  {setMessageFirstPointError.message}
                </div>
              )}
            </div>
            <div className={layoutStyles.secondPointInput}>
              <input
                className={`${layoutStyles.mainInput} ${layoutStyles.routeInput}`}
                {...setSecondPoint}
                ref={(e) => {
                  setSecondPointRef(e);
                  secondPointRef.current = e;
                }}
                placeholder="&nbsp;&nbsp;&nbsp;Введите адрес второй точки маршрута"
                pattern="^[^<>]+$"
                title="Пожалуйста, не используйте символы ^[^<>]+$ в адресе второй точки маршрута"
              />
              {setSecondPointError && (
                <div className={layoutStyles.warning}>
                  {setSecondPointError.message}
                </div>
              )}
            </div>
            <div className={layoutStyles.secondPointMessageInput}>
              <input
                className={`${layoutStyles.mainInput} ${layoutStyles.routeInput}`}
                {...setMessageSecondPoint}
                ref={(e) => {
                  setMessageSecondPointRef(e);
                }}
                placeholder="&nbsp;&nbsp;&nbsp;Введите сообщение для второй точки маршрута"
                pattern="^[^<>]+$"
                title="Пожалуйста, не используйте символы ^[^<>]+$ в сообщении для второй точки маршрута"
              />
              {setMessageSecondPointError && (
                <div className={layoutStyles.warning}>
                  {setMessageSecondPointError.message}
                </div>
              )}
            </div>
            <button className={layoutStyles.mainButtonStyle} type="submit">
              Добавить маршрут на карту c сообщениями
            </button>
          </form>
          {errorMessage && (
            <div className={layoutStyles.warning}>{errorMessage}</div>
          )}
        </div>
      </div>
      <div className={layoutStyles.rightSide}>
        <div className={layoutStyles.forMap}>{mapRouteWithProps}</div>
      </div>
    </div>
  );
}

export default RouteMapLayout;
