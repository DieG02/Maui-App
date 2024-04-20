import React, { createContext, useState, useMemo } from 'react';
import { IContact } from '../types/types';

interface IGeneralContext {
  contacts: IContact[];
  setContacts: (value: IContact[]) => void;
  phoneNumbersSet: Set<string>;
}

const defaultValue: IGeneralContext = {
  contacts: [],
  setContacts: () => {},
  phoneNumbersSet: new Set(),
};

export const GeneralContext = createContext<IGeneralContext>(defaultValue);

interface Props {
  children: React.ReactNode;
}

const GeneralProvider = ({ children }: Props) => {
  const [contacts, setContacts] = useState<IContact[]>(defaultValue.contacts);
  const phoneNumbersSet = useMemo(() => {
    return new Set(contacts.map(contact => contact.phone));
  }, [contacts]);

  return (
    <GeneralContext.Provider value={{ contacts, setContacts, phoneNumbersSet }}>{children}</GeneralContext.Provider>
  );
};
export default GeneralProvider;
