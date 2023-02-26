import { TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import React from 'react';

interface Props {
  size:number,
  color:string,
  value:boolean,
  toogle:()=>void,
}
const HiderComponent = ({size, color, value, toogle}:Props) => {
  return (
    <TouchableOpacity onPress={toogle}>
      {value ? (
        <Icon name="eye-off" size={size} color={color} />
      ) : (
        <Icon name="eye" size={size} color={color} />
      )}
    </TouchableOpacity>
  )
}

export default HiderComponent;