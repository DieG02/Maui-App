import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ScrollContainer from "../../containers/ScrollContainer";
import styles from "./style";

type Props = {
  children: ReactNode;
};

const Form = ({ children }: Props) => {
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollContainer>{children}</ScrollContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Form;
