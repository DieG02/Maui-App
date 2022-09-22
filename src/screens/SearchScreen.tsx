import React, { useState } from "react";
import { TextInput, View } from "react-native";
import Header from "../components/common/Header";
import Icon from "../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../styles/globalStyles";
import ButtonIcon from "../components/common/ButtonIcon";
import Icon1 from "react-native-vector-icons/Fontisto";
import ScreenContainer from "../components/containers/ScreenContainer";

const { mainColor, secondaryColor } = globalStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

const SearchScreen = ({ navigation }: Props) => {
  const [text, onChangeText] = useState("");

  const handleSubmit = () => {
    if (text !== "") {
      onChangeText("");
    }
    return null;
  };

  return (
    <ScreenContainer>
      <Header
        name="Búsqueda"
        color="white"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color={mainColor} />
          </Icon>
        }
      />
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 10,
          height: 60,
          backgroundColor: "#fafafa",
          borderRadius: 30,
          flexDirection: "row",
          display: "flex",
        }}
      >
        <ButtonIcon onPress={handleSubmit}>
          <Icon1 name="search" size={25} color={secondaryColor} />
        </ButtonIcon>
        <TextInput
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmit}
          value={text}
          autoFocus={true}
          placeholder="Buscar"
          style={{ width: "70%" }}
        />
        {text !== "" && (
          <ButtonIcon onPress={() => onChangeText("")}>
            <Icon1 name="close" size={25} color={secondaryColor} />
          </ButtonIcon>
        )}
      </View>
    </ScreenContainer>
  );
};

export default SearchScreen;
