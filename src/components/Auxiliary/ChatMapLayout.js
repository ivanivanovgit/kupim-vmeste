// ChatMapLayout.js
import React, { useState, useEffect, useRef } from "react";
import { Divider, Select, MenuItem, FormControl, Orange } from "@mui/material";
import { fetchThemes } from "../../../src/utils/asyncFunctions";

function ChatMapLayout({ mapChat, layoutStyles }) {
  const [address, setAddress] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputGroupText, setInputGroupText] = useState("");
  const [createMarker, setCreateMarker] = useState(0);
  const [filtrMapMarker, setFiltrMapMarker] = useState(0);
  /*  const [markers, setMarkers] = useState([]);  */
  const [addedMarkers, setAddedMarkers] = useState([]);
  // Добавляем состояние для хранения массива тем
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [_, setThemeWarning] = useState(false);
  // состояние: размещен ли маркер на карте или нет
  const [isMarkerPlaced, setIsMarkerPlaced] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchButtonClick, setSearchButtonClick] = useState(null);
  const searchInputRef = useRef(null);
  const [showAllMarkers, setShowAllMarkers] = useState(false);
  const [deleteThemeError, setDeleteThemeError] = useState("");

  function onDeleteTheme(event) {
    event.preventDefault();

    // Проверяем есть ли маркеры с выбранной темой
    const hasMarkersWithTheme = addedMarkers.some(
      // TODO доработать проверку удаления темы
      (marker) => marker.themeMarker === selectedTheme
    );

    // Если есть маркеры с выбранной темой, устанавливаем состояние ошибки и не удаляем тему
    if (hasMarkersWithTheme) {
      setDeleteThemeError(
        "Невозможно удалить тему, так как есть маркеры с этой темой."
      );
      return;
    }

    const newThemes = themes.filter((theme) => theme !== selectedTheme);
    setThemes(newThemes);
    setSelectedTheme(newThemes.length > 0 ? newThemes[0] : "");
    setDeleteThemeError(""); // Очищаем сообщение об ошибке при успешном удалении темы
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

  /*  const addMarker = (textTheme, coords, content) => {
    if (textTheme != undefined && coords != undefined && content != undefined) {
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          themeMarker: textTheme,
          coordinates: coords,
          balloonContent: content,
        },
      ]);
    }
  };  */

  const handleAddressChange = (newAddress) => {
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
      setThemeWarning(false);
    } else {
      setThemeWarning(true);
    }

    if (!isMarkerPlaced || !selectedTheme) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  };

  const handleFormFilteredMarkers = (event) => {
    event.preventDefault();
    setShowAllMarkers((prevState) => (prevState = false));
    setFiltrMapMarker((prevFiltrMark) => prevFiltrMark + 1);
  };

  const mapChatWithProps = React.cloneElement(mapChat, {
    onAddressChange: handleAddressChange,
    inputText: inputText,
    createMarker: createMarker,
    setAddedMarkers: setAddedMarkers,
    filtrMapMarker: filtrMapMarker,
    selectedTheme: selectedTheme,
    setIsMarkerPlaced: setIsMarkerPlaced,
    searchButtonClick: searchButtonClick,
    searchInputRef: searchInputRef.current,
    setSearchInput: setSearchInput,
    showAllMarkers: showAllMarkers,
  });

  useEffect(() => {
    fetchThemes().then((theme) => {
      /*   console.log("theme", theme); */
      setThemes(theme);
    });
  }, []);

  useEffect(() => {
    if (themes.length > 0 && !selectedTheme) {
      setSelectedTheme(themes[0]);
    }
  }, [themes]);

  useEffect(() => {
    console.log("addedMarkers array:", addedMarkers);
    console.log("******");
  }, [addedMarkers]);

  useEffect(() => {
    console.log("Selected theme:", selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    console.log("Themes array:", themes);
  }, [themes]);

  return (
    <div className={layoutStyles.wrapper}>
      <div className={layoutStyles.leftSide}>
        <div className={layoutStyles.searchAdressWrapper}>
          <div className={layoutStyles.searchAdressLabel}>
            1. Введите адрес в поиске или нажмите на карту
          </div>

          <form onSubmit={handleSearchButtonClick}>
            {/*    TODO: Доделать стиль ошибок */}
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.stretchInput}`}
              type="text"
              name="search"
              ref={searchInputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="&nbsp;&nbsp;&nbsp;Введите адрес для поиска"
              pattern="^[^<>]+$" /* TODO: Доделать патерны от СВО везде по проекту */
              title="Пожалуйста, введите адрес"
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
        {/* Форма для добавления темы*/}
        <div className={layoutStyles.addDeleteThemeWrapper}>
          <div className={layoutStyles.addThemeLabel}>2. Задайте тему</div>
          <form onSubmit={handleAddThemeFormSubmit}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.stretchInputAddTheme}`}
              type="text"
              name="filterTheme"
              value={inputGroupText}
              onChange={handleInputGroupChange}
              placeholder="&nbsp;&nbsp;&nbsp;Введите тему для добавления"
              pattern="^[^<>]+$"
              title="Пожалуйста, задайте тему"
              required
            />
            <button className={layoutStyles.mainButtonStyle} type="submit">
              Добавить
            </button>
          </form>
          {/* Форма для фильтрации маркеров*/}
          <form>
            <div className={layoutStyles.selectedThemeWrapper}>
              <div className={layoutStyles.chosenTheme}>Выбранная тема: </div>
              <div className={layoutStyles.selectedTheme}>
                {selectedTheme}
                {!selectedTheme && (
                  <div className={layoutStyles.addressWarning}>
                    *Добавьте тему
                  </div>
                )}
              </div>
            </div>
            <div className={layoutStyles.listOfTheme}>Список тем:</div>
            <FormControl fullWidth size="small">
              <Select
                value={selectedTheme}
                onChange={handleSelectThemeChange}
                className={`${layoutStyles.mainInput} ${layoutStyles.stretchTheme}`}
                name="themeList"
                displayEmpty
                color="thirdColor"
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
                    {theme}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={layoutStyles.buttonThemeWrapper}>
              <button
                className={`${layoutStyles.mainButtonStyle} ${layoutStyles.filtrMarkersButton}`}
                onClick={handleFormFilteredMarkers}
              >
                Отфильтровать маркеры по теме
              </button>
              <button
                className={`${layoutStyles.mainButtonStyle} ${layoutStyles.showMarkersButton}`}
                onClick={handleShowAllMarkers}
              >
                Показать все маркеры
              </button>

              <button
                className={`${layoutStyles.mainButtonStyle} ${layoutStyles.deleteThemeButton}`}
                onClick={onDeleteTheme}
              >
                Удалить тему
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
              pattern="^[^<>]+$"
              title="Пожалуйста, введите сообщение"
              required
            />
            <button className={layoutStyles.mainButtonStyle} type="submit">
              Добавить на карту
            </button>
          </form>
        </div>
        {showMessage && (
          <div className={layoutStyles.message}>
            *Задайте тему и адреc, затем нажмите кнопку "Добавить на карту"
          </div>
        )}
        {deleteThemeError && ( // TODO: доделать вывод ошибки
          <div className={layoutStyles.errorMessage}>{deleteThemeError}</div>
        )}
      </div>
      <div className={layoutStyles.rightSide}>
        <div className={layoutStyles.forMap}>{mapChatWithProps}</div>
      </div>
    </div>
  );
}

export default ChatMapLayout;
