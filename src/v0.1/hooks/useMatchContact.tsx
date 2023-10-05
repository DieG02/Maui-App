import { useContext, useMemo } from 'react';
import { GeneralContext } from '../context/GeneralContext';

//FIXME: Refactor this componente to avoid a lot of re-renders
const useMatchContact = (phone: string) => {
  const { phoneNumbersSet } = useContext(GeneralContext);

  const isAdded = phoneNumbersSet.has(phone);

  return {
    isAdded,
  };
};

export default useMatchContact;
