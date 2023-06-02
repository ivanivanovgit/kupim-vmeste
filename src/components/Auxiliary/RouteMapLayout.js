// RouteMapLayout.js
import { useState, useRef, cloneElement } from "react";
import { useForm, useController } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { incrementCountMapRoute } from "../../redux/slices/routeSlices/routeSlice";

function RouteMapLayout({ mapRoute, layoutStyles }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState(""); //сообщение об успешной отправке формы
  const firstPointRef = useRef(null);
  const secondPointRef = useRef(null);

  const dispatch = useDispatch();
  const countMapRoute = useSelector((state) => state.routeCount.countMapRoute);

  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });

  const {
    field: { ref: setFirstPointRef, ...setFirstPoint },
    fieldState: { error: setFirstPointError },
  } = useController({
    name: "firstPoint",
    control,
    rules: { required: "Введите адрес пункта отправления" },
    defaultValue: "",
  });

  const {
    field: { ref: setSecondPointRef, ...setSecondPoint },
    fieldState: { error: setSecondPointError },
  } = useController({
    name: "secondPoint",
    control,
    rules: { required: "Введите адрес пункта назначения" },
    defaultValue: "",
  });

  const {
    field: { ref: setMessageFirstPointRef, ...setMessageFirstPoint },
    fieldState: { error: setMessageFirstPointError },
  } = useController({
    name: "messageFirstPoint",
    control,
    rules: { required: "Введите сообщение для маршрута" },
    defaultValue: "",
  });

  const handleFormAddRoute = (data) => {
    if (data) {
      dispatch(incrementCountMapRoute());
      setSubmitMessage(
        'Маршрут добавлен, для добавления нового маршрута введите новые адреса, сообщение и нажмите на кнопку "Добавить маршрут"'
      );
      setTimeout(() => {
        setSubmitMessage("");
      }, 3000); // сбрасываем сообщение после 3 секунд
    }
  };

  const handleClearFields = () => {
    reset({
      firstPoint: "",
      secondPoint: "",
      messageFirstPoint: "",
    });
    setErrorMessage("");
    setSubmitMessage("");
  };

  const mapRouteWithProps = cloneElement(mapRoute, {
    setFirstPoint: setFirstPoint,
    setSecondPoint: setSecondPoint,
    firstPointRef: firstPointRef.current,
    secondPointRef: secondPointRef.current,
    setMessageFirstPoint: setMessageFirstPoint,
    setErrorMessage: setErrorMessage,
  });

  return (
    <div className={layoutStyles.wrapper}>
      <div className={layoutStyles.leftSide}>
        <div className={layoutStyles.RouteLabel}>
          Просмотр и добавление маршрутов на карту
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
              placeholder="&nbsp;Адрес пункта отправления"
              pattern="^[^<>]*\S[^<>]*$"
              title="Пожалуйста, не используйте < и >"
            />
            {setFirstPointError && (
              <div className={layoutStyles.smallWarning}>
                {setFirstPointError.message}
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
              placeholder="&nbsp;Адрес пункта назначения"
              pattern="^[^<>]*\S[^<>]*$"
              title="Пожалуйста, не используйте < и >"
            />
            {setSecondPointError && (
              <div className={layoutStyles.smallWarning}>
                {setSecondPointError.message}
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
              placeholder="&nbsp;Сообщение для маршрута"
              pattern="^[^<>]*\S[^<>]*$"
              title="Пожалуйста, не используйте < и >"
            />
            {setMessageFirstPointError && (
              <div className={layoutStyles.smallWarning}>
                {setMessageFirstPointError.message}
              </div>
            )}
          </div>
          <div className={layoutStyles.buttonsRoute}>
            <button
              className={`${layoutStyles.mainButtonStyle} ${layoutStyles.routeButton}`}
              type="submit"
            >
              Добавить маршрут
            </button>

            <button
              className={`${layoutStyles.mainButtonStyle} ${layoutStyles.routeButton}`}
              type="button"
              onClick={handleClearFields}
            >
              Очистить поля
            </button>
          </div>
        </form>
        <div className={layoutStyles.smallWarning}>
          {errorMessage && <div>{errorMessage}</div>}
          {submitMessage && ( // отображение сообщения после отправки
            <div>{submitMessage}</div>
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
