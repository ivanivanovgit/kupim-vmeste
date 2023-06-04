// useSelectedAddressChat

import { useEffect } from "react";

const useSelectedAddressChat = (selectedAddress, setSearchInput, ymaps) => {
  useEffect(() => {
    if (selectedAddress) {
      setSearchInput(selectedAddress); // Устанавливаем значение поля ввода адреса
    }
  }, [selectedAddress, ymaps]);
};

export default useSelectedAddressChat;
