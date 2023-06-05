// ChatMapLayout.js
import React, { useState, useEffect, useRef } from "react";
import {
  Divider,
  Select,
  MenuItem,
  FormControl,
  ListItemText,
} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {
  fetchThemes,
  checkThemeHasMarkers,
} from "../../../src/utils/endPointsHandlers";

function ChatMapLayout({ mapChat, layoutStyles }) {
  const [address, setAddress] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputGroupText, setInputGroupText] = useState("");
  const [createMarker, setCreateMarker] = useState(0);
  // Добавляем состояние для хранения массива тем
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  // состояние: размещен ли маркер на карте или нет
  const [isMarkerPlaced, setIsMarkerPlaced] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchButtonClick, setSearchButtonClick] = useState(null);
  const [showAllMarkers, setShowAllMarkers] = useState(false);
  const [deleteThemeError, setDeleteThemeError] = useState("");
  const [checkDublicateMarkersMesage, setCheckDublicateMarkersMesage] =
    useState("");
  const searchInputRef = useRef(null);

  async function onDeleteTheme(event) {
    event.preventDefault();

    const hasMarkers = await checkThemeHasMarkers(selectedTheme);

    if (hasMarkers) {
      setDeleteThemeError(`Удалите маркеры темы перед её удалением`);
      setTimeout(() => {
        setDeleteThemeError("");
      }, 3000); // сбрасываем сообщение после 3 секунд
      return;
    }

    const newThemes = themes.filter((theme) => theme !== selectedTheme);
    setThemes(newThemes);
    setSelectedTheme(newThemes.length > 0 ? newThemes[0] : "");
    setDeleteThemeError(`Тема \"${selectedTheme}\"  удалена успешно.`);
    setTimeout(() => {
      setDeleteThemeError(""); // Очищаем сообщение об ошибке при успешном удалении темы
    }, 3000); // сбрасываем сообщение после 3 секунд
  }

  const handleShowAllMarkers = (event) => {
    event.preventDefault();
    setShowAllMarkers(true);
  };

  const handleSearchButtonClick = (event) => {
    event.preventDefault();
    setSearchButtonClick(searchInput);
  };

  useEffect(() => {
    if (searchButtonClick) {
      setSearchButtonClick(null);
    }
  }, [searchButtonClick]);

  // Обработчик события нажатия кнопки "Добавить тему"
  const handleAddThemeFormSubmit = (event) => {
    event.preventDefault();
    const themeExists = themes.some((theme) => theme === inputGroupText);

    if (!themeExists) {
      setThemes((prevThemes) => [...prevThemes, inputGroupText]);
      setSelectedTheme(inputGroupText);
    }
  };

  // Обработчик события изменения выбранной темы в элементе select
  const handleSelectThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const onAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  // Обработчик события изменения текста в поле ввода
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Обработчик события изменения текста в группе
  const handleInputGroupChange = (event) => {
    setInputGroupText(event.target.value);
  };

  const handleFormSubmitmessage = (event) => {
    event.preventDefault();
    if (selectedTheme) {
      setCreateMarker((prev) => prev + 1);
    }

    if (!isMarkerPlaced || !selectedTheme) {
      setShowMessage("Задайте адрес и тему");
      setTimeout(() => {
        setShowMessage("");
      }, 3000);
    } else {
      setShowMessage("");
    }
  };

  const mapChatWithProps = React.cloneElement(mapChat, {
    onAddressChange: onAddressChange,
    inputText: inputText,
    createMarker: createMarker,
    selectedTheme: selectedTheme,
    setSelectedTheme: setSelectedTheme,
    setIsMarkerPlaced: setIsMarkerPlaced,
    searchButtonClick: searchButtonClick,
    searchInputRef: searchInputRef.current,
    setSearchInput: setSearchInput,
    showAllMarkers: showAllMarkers,
    setShowAllMarkers: setShowAllMarkers,
    setCheckDublicateMarkersMesage: setCheckDublicateMarkersMesage,
  });

  useEffect(() => {
    fetchThemes().then((theme) => {
      setThemes(theme);
    });
  }, []);

  useEffect(() => {
    if (themes.length > 0 && !selectedTheme) {
      setSelectedTheme(themes[0]);
    }
  }, [themes]);

  return (
    <div className={layoutStyles.wrapper}>
      <div className={layoutStyles.leftSide}>
        <div className={layoutStyles.searchAdressWrapper}>
          <div className={layoutStyles.searchAdressLabel}>
            1. Введите адрес в поиске или нажмите на карту
          </div>

          <form onSubmit={handleSearchButtonClick}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.stretchInput}`}
              type="text"
              name="search"
              ref={searchInputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="&nbsp;&nbsp;&nbsp;Введите адрес для поиска"
              pattern="^[^<>]*\S[^<>]*$"
              title="Пожалуйста, введите адрес. Не используйте < и >"
              required
            />
            <button className={layoutStyles.mainButtonStyle} type="submit">
              Найти
            </button>
          </form>
        </div>

        <div className={layoutStyles.addressLabel}>Найденный адрес:</div>
        <div className={layoutStyles.alignVertical}>
          <div>{address}</div>
          {!isMarkerPlaced && (
            <div className={layoutStyles.addressWarning}>
              *Щелкните мышкой на карте в нужном вам месте или выберите адрес
              при помощи поиска выше
            </div>
          )}
        </div>
        <Divider />
        {/* Форма для выбора и добавления темы*/}
        <div className={layoutStyles.addDeleteThemeWrapper}>
          <div className={layoutStyles.addThemeLabel}>
            2.Выберите или добавьте тему
          </div>
          <form>
            <FormControl fullWidth size="small">
              <Select
                value={selectedTheme}
                onChange={handleSelectThemeChange}
                className={`${layoutStyles.mainInput} ${layoutStyles.stretchTheme}`}
                name="themeList"
                displayEmpty
                color="thirdColor"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {themes.length === 0 && (
                  <MenuItem
                    className={layoutStyles.MenuItemStyle}
                    value=""
                    disabled
                  >
                    Тема не задана
                  </MenuItem>
                )}
                {themes.map((theme, index) => (
                  <MenuItem
                    key={index}
                    className={layoutStyles.MenuItemStyle}
                    value={theme}
                  >
                    {/* Обертываем текст элемента в ListItemText и применяем стили для переноса слов: */}
                    <ListItemText
                      primary={theme}
                      style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className={layoutStyles.selectedThemeWrapper}>
              <div className={layoutStyles.chosenTheme}>Выбранная тема: </div>
              <div className={layoutStyles.selectedTheme}>
                {selectedTheme}
                {selectedTheme && (
                  <CancelPresentationIcon
                    className={layoutStyles.closeIcon}
                    onClick={onDeleteTheme}
                  />
                )}
                {!selectedTheme && (
                  <div className={layoutStyles.addressWarning}>
                    *Выберите или добавьте тему
                  </div>
                )}
              </div>
            </div>

            <button
              className={`${layoutStyles.mainButtonStyle} ${layoutStyles.showMarkersButton}`}
              onClick={handleShowAllMarkers}
            >
              Показать маркеры по всем темам
            </button>
          </form>
          <form onSubmit={handleAddThemeFormSubmit}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.stretchInputAddTheme}`}
              type="text"
              name="filterTheme"
              value={inputGroupText}
              onChange={handleInputGroupChange}
              placeholder="&nbsp;&nbsp;&nbsp;Введите тему для добавления"
              pattern="^[^<>]*\S[^<>]*$"
              title="Пожалуйста, задайте тему. Не используйте < и >"
              required
            />
            <div className={layoutStyles.delAddThemeButtonsWrapper}>
              <button className={layoutStyles.mainButtonStyle} type="submit">
                Добавить тему
              </button>
            </div>
          </form>
        </div>
        <Divider />
        {/* Форма для ввода текста сообщений и добавления маркера */}
        <div className={layoutStyles.addMessageWithMarker}>
          <div className={layoutStyles.addMessageWithMarkerLabel}>
            3. Добавьте сообщение на карту
          </div>
          <form onSubmit={handleFormSubmitmessage}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.addMessageWithMarkerInput}`}
              type="text"
              name="message"
              value={inputText}
              onChange={handleInputChange}
              placeholder="&nbsp;&nbsp;&nbsp;Введите сообщение"
              pattern="^[^<>]*\S[^<>]*$"
              title="Пожалуйста, введите сообщение. Не используйте < и >"
              required
            />
            <button className={layoutStyles.mainButtonStyle} type="submit">
              Добавить на карту
            </button>
          </form>
        </div>
        {showMessage && (
          <div className={layoutStyles.chatError}>{showMessage}</div>
        )}
        {deleteThemeError && (
          <div className={layoutStyles.chatError}>{deleteThemeError}</div>
        )}
        {checkDublicateMarkersMesage && (
          <div className={layoutStyles.chatError}>
            {checkDublicateMarkersMesage}
          </div>
        )}
      </div>
      <div className={layoutStyles.rightSide}>
        <div className={layoutStyles.forMap}>{mapChatWithProps}</div>
      </div>
    </div>
  );
}

export default ChatMapLayout;
