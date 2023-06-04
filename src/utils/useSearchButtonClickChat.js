// useSearchButtonClickChat.js

import { useEffect } from "react";

const useSearchButtonClickChat = (searchButtonClick, searchAddress, ymaps) => {
  useEffect(() => {
    if (searchButtonClick) {
      searchAddress(searchButtonClick);
    }
  }, [searchButtonClick, ymaps]);
};

export default useSearchButtonClickChat;
