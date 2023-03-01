import React from "react";
import { Text, View } from "react-native";
import useToogle from "../../../hooks/useToggle";
import customStyles from "../../../styles/customStyles";
import HiderComponent from "../../common/HiderComponent";
import styles from "./style";

const { textBlack } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  data: number | undefined;
}

const GeneralBalance = ({ data }: Props) => {
  const { value, toogle } = useToogle();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Saldo General</Text>
        <HiderComponent
          size={30}
          color={textBlack}
          value={value}
          toogle={toogle}
        />
      </View>
      <View style={styles.container}>
        {value ? (
          <Text style={styles.textPrice}>$****</Text>
        ) : (
          <Text style={styles.textPrice}>
            {data?.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </Text>
        )}
      </View>
    </View>
  );
};

export default GeneralBalance;
