import { useContext, useMemo } from "react";
import { GeneralContext } from "../context/GeneralContext";

const useMatchContact = (phone: string) => {
  const { contacts } = useContext(GeneralContext);

  const isAdded = useMemo(
    () => contacts.some((item) => item.phone === phone),
    [contacts, phone]
  );

  return {
    contacts,
    isAdded,
  };
};

export default useMatchContact;
