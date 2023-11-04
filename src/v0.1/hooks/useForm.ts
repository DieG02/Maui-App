import { useState } from 'react';

const useForm = <T>(initialValue: T) => {
  const [values, setValues] = useState<T>(initialValue);

  const validateValues = (rules: string[]) => {
    const isCheck = rules.every(key => {
      const value = values[key as keyof T];
      if (typeof value === 'string') {
        const numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
        return value !== '' && value !== null && numericValue !== 0;
      } else {
        return value !== '' && value !== null;
      }
    });

    return isCheck;
  };

  return { values, setValues, validateValues };
};

export default useForm;
