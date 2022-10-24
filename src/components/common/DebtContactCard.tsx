import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import globalStyles from "../../styles/globalStyles";
import Right from "react-native-vector-icons/Entypo";

const { mainColor, textBlack, background, secondaryColor, expense, income } = globalStyles;
interface Props {
  data: DebtContact;
  type: string;
  onPress: () => void;
}

const DebtContactCard = ({ data, type, onPress }: Props) => {
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

  const renderTypeDescription = () => {
    switch(type){
      case "client": {
        return (
          <Text
            style={{
              color: textBlack,
              fontSize: 14,
              fontFamily: "Gilroy-Regular",
            }}
          >
            Ventas: {data.sales}
          </Text>
        );
      }

      case "provider": {
        return (
          <Text
            style={{
              color: textBlack,
              fontSize: 14,
              fontFamily: "Gilroy-Regular",
          }}
        >
          Compras: {data.purchases}
        </Text>
        );
      }
    }
  }

  const renderTypePrice = () => {
    switch(type){
      case "client": {
        return (
          <Text
            style={{
              color: income,
              fontSize: 16,
              fontFamily: "Gilroy-SemiBold",
          }}
        >
          {data.price}
        </Text>
        );
      }

      case "provider": {
        return (
          <Text
            style={{
              color: expense,
              fontSize: 16,
              fontFamily: "Gilroy-SemiBold",
            }}
          >
          {data.price}
        </Text>
        );
      }
    }
  }

  return (
      <TouchableOpacity
        style={{
          marginHorizontal: 20,
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
            {renderTypeDescription()}
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems:"flex-end"
          }}
        >
          {renderTypePrice()}
          <Text 
            style={{
                color: textBlack,
                fontSize: 14,
                fontFamily: "Gilroy-Regular",
            }}
          >
            {data.date}
          </Text>
        </View>
        <Right name="chevron-small-right" color={textBlack} size={35} />
      </TouchableOpacity>
  );
};

export default DebtContactCard;
