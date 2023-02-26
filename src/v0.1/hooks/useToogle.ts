import { useState } from "react";

const useToogle = () =>{
  const [value, setValue] = useState(false);

  const toogle = () =>{
    return setValue(!value);
  }
  
  return { value, toogle }
}

export default useToogle;