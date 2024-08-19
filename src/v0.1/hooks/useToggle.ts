import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
  const [value, setToggle] = useState<boolean>(initialState);

  const toggle = useCallback(() => setToggle(prev => !prev), []);

  return { value, toggle, setToggle };
};

export default useToggle;
