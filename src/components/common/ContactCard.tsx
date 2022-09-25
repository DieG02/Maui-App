import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import globalStyles from "../../styles/globalStyles";
import Right from "react-native-vector-icons/Entypo";

const { mainColor } = globalStyles;
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
              backgroundColor: "#E6EFF8",
              borderRadius: 15,
              marginRight: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="user" size={20} color={mainColor} />
          </View>
        );
      }

      case "provider": {
        return (
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#E6EFF8",
              borderRadius: 15,
              marginRight: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="truck" size={30} color={mainColor} />
          </View>
        );
      }
      case "employee": {
        return (
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#E6EFF8",
              borderRadius: 15,
              marginRight: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="group" size={30} color={mainColor} />
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
        marginBottom: 20,
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
              color: "#131313",
              fontSize: 16,

              fontFamily: "Gilroy-SemiBold",
            }}
          >
            {data.name}
          </Text>

          <Text
            style={{
              color: "#131313",
              fontSize: 14,
              fontFamily: "Gilroy-Regular",
            }}
          >
            {data.phone}
          </Text>
        </View>
      </View>
      <Right name="chevron-small-right" color="#60708F" size={35} />
    </TouchableOpacity>
  );
};

export default ContactCard;
