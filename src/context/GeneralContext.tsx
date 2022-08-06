import React, { createContext, useState } from "react";

interface IGeneralContext {
  contacts: IContact[];
  setContacts: (value: []) => void;
}

const defaultValue: IGeneralContext = {
  contacts: [],
  setContacts: () => {},
};

export const GeneralContext = createContext<IGeneralContext>(defaultValue);

interface Props {
  children: React.ReactNode;
}

const GeneralProvider = ({ children }: Props) => {
  const [contacts, setContacts] = useState<IContact[]>(defaultValue.contacts);
  return (
    <GeneralContext.Provider value={{ contacts, setContacts }}>
      {children}
    </GeneralContext.Provider>
  );
};
export default GeneralProvider;
