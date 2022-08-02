import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import globalStyles from "../../styles/globalStyles";

const { mainColor } = globalStyles;
interface Props {
  data: IContact;
  type: string;
}

const ContactCard = ({ data, type }: Props) => {
  const renderTypeContact = () => {
    switch (type) {
      case "consumer": {
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
            <Icon name="user" size={30} color={mainColor} />
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
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {renderTypeContact()}
        <Text style={{ color: "#131313" }}>{data.name}</Text>
      </View>
      <Text style={{ color: "#131313" }}>{data.phone}</Text>
    </TouchableOpacity>
  );
};

export default ContactCard;
