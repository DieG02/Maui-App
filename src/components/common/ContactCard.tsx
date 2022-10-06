import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import globalStyles from "../../styles/globalStyles";
import Right from "react-native-vector-icons/Entypo";

const { mainColor, textBlack, background, secondaryColor } = globalStyles;
interface Props {
  data: IContact;
  type: string;
  onPress: () => void;
}

const ContactCard = ({ data, type, onPress }: Props) => {
  const renderTypeContact = () => {
    switch (type) {
      case "client": {
        return (
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: secondaryColor,
              borderRadius: 15,
              marginRight: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="user" size={25} color={mainColor} />
          </View>
        );
      }

      case "provider": {
        return (
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: secondaryColor,
              borderRadius: 15,
              marginRight: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="truck" size={25} color={mainColor} />
          </View>
        );
      }
    }
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
        backgroundColor: background,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {renderTypeContact()}
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: textBlack,
              fontSize: 16,
              fontFamily: "Gilroy-SemiBold",
            }}
          >
            {data.name}
          </Text>
          <Text
            style={{
              color: textBlack,
              fontSize: 14,
              fontFamily: "Gilroy-Regular",
            }}
          >
            {data.phone}
          </Text>
        </View>
      </View>
      <Right name="chevron-small-right" color={textBlack} size={35} />
    </TouchableOpacity>
  );
};

export default ContactCard;
