import { useState } from "react";

const useForm = <T>(initialValue: T) => {
  const [values, setValues] = useState<T>(initialValue);

  const validateValues = (rules: string[]) => {
    const isCheck = rules.every((key) => values[key as keyof T] !== "" && values[key as keyof T] !== null);
    return isCheck;
  };

  return { values, setValues, validateValues };
};

export default useForm;
