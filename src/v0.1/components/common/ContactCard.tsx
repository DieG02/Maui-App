import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import customStyles from "../../styles/customStyles";
import Right from "react-native-vector-icons/Entypo";

const { textBlack, background, background2, blueGrotto } = customStyles;
interface Props {
  data: IContact;
  type: string;
  onPress: () => void;
  showNoRightIcon?: boolean;
  disabled?: boolean;
}

const ContactCard = ({
  data,
  type,
  onPress,
  showNoRightIcon,
  disabled,
}: Props) => {
  const renderTypeContact = () => {
    switch (type) {
      case "client": {
        return (
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: background2,
              borderRadius: 25,
              marginRight: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="user" size={20} color={blueGrotto} />
          </View>
        );
      }

      case "provider": {
        return (
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: background2,
              borderRadius: 25,
              marginRight: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="truck" size={20} color={blueGrotto} />
          </View>
        );
      }
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
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
            {data?.name}
          </Text>
          <Text
            style={{
              color: textBlack,
              fontSize: 14,
              fontFamily: "Gilroy-Regular",
            }}
          >
            {data?.phone}
          </Text>
        </View>
      </View>
      {!showNoRightIcon && (
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Right name="chevron-small-right" color={textBlack} size={30} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ContactCard;
