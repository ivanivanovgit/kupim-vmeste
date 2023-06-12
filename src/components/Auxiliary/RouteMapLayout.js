// RouteMapLayout.js
import { useRef, cloneElement } from "react";
import { useForm, useController } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorMessage,
  selectErrorMessage,
  setSubmitMessage,
  selectSubmitMessage,
} from "../../redux/slices/routeSlices/messageSlice";
import { incrementCountMapRoute } from "../../redux/slices/routeSlices/routeSlice";

import { validateInput } from "../../utils/validateInput";

function RouteMapLayout({ mapRoute, layoutStyles }) {
  const firstPointRef = useRef(null);
  const secondPointRef = useRef(null);

  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const submitMessage = useSelector(selectSubmitMessage);

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

  const handleInputChange = (setter, value) => {
    const validation = validateInput(value);

    if (!validation.valid) {
      dispatch(setErrorMessage(validation.errorMessage));
    } else {
      setter(validation.text);
      dispatch(setErrorMessage(""));
    }
  };

  const handleFormAddRoute = (data) => {
    if (data) {
      dispatch(incrementCountMapRoute());
    }
  };

  const handleClearFields = () => {
    reset({
      firstPoint: "",
      secondPoint: "",
      messageFirstPoint: "",
    });
    dispatch(setErrorMessage(""));
    dispatch(setSubmitMessage(""));
  };

  const mapRouteWithProps = cloneElement(mapRoute, {
    setFirstPoint: setFirstPoint,
    setSecondPoint: setSecondPoint,
    firstPointRef: firstPointRef.current,
    secondPointRef: secondPointRef.current,
    setMessageFirstPoint: setMessageFirstPoint,
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
              maxLength={200}
              title="Пожалуйста, введите адрес пункта отправления."
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
              maxLength={200}
              title="Пожалуйста, введите адрес пункта назначения."
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
              maxLength={300}
              title="Пожалуйста, введите сообщение для маршрута. Данное сообщение будет у пунктов отправления и назначения. Длина сообщения не должна превышать 300 символов."
              onChange={(e) =>
                handleInputChange(setMessageFirstPoint.onChange, e.target.value)
              }
            />
            {setMessageFirstPointError && (
              <div className={layoutStyles.smallWarning}>
                {setMessageFirstPointError.message}
              </div>
            )}
          </div>
          <div className={layoutStyles.buttonsRoute}>
            <button
              className={`${layoutStyles.mainButtonStyle} ${layoutStyles.routeButton} ${layoutStyles.addRouteButton}`}
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
          {errorMessage && (
            <div className={layoutStyles.errorMessageRoute}>{errorMessage}</div>
          )}
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
