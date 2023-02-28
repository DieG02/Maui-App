import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import customStyles from "../../styles/customStyles";
import Right from "react-native-vector-icons/Entypo";
import moment from "moment";
import 'moment/locale/es';

const { mainColor, textBlack, background, secondaryColor, expense, income } =
  customStyles;
interface Props {
  data: IDebtContact;
  type: string;
  onPress: () => void;
}

const DebtContactCard = ({ data, type, onPress }: Props) => {

  moment.locale("es");
  const formattedDate = moment(data.date).format('D [de] MMMM');

  const renderTypeContact = () => {
    switch (type) {
      case "client": {
        return (
          <View style={styles.iconType}>
            <Icon name="user" size={25} color={mainColor} />
          </View>
        );
      }
      case "provider": {
        return (
          <View style={styles.iconType}>
            <Icon name="truck" size={25} color={mainColor} />
          </View>
        );
      }
    }
  };

  const renderTypeDescription = () => {
    switch (type) {
      case "client": {
        return (
          <Text style={styles.descriptionType}>
            Ventas: {data.sales}
          </Text>
        );
      }
      case "provider": {
        return (
          <Text style={styles.descriptionType}>
            Compras: {data.purchases}
          </Text>
        );
      }
    }
  };

  const renderTypePrice = () => {
    switch (type) {
      case "client": {
        return (
          <Text style={[styles.label, { color: income }]}>
            ${data.totalPrice?.toLocaleString("es")}
          </Text>
        );
      }
      case "provider": {
        return (
          <Text style={[styles.label, { color: expense }]}>
            ${data.totalPrice?.toLocaleString("es")}
          </Text>
        );
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 5,
      backgroundColor: background,
    },
    iconType: {
      width: 50,
      height: 50,
      backgroundColor: secondaryColor,
      borderRadius: 15,
      marginRight: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    descriptionType: {
      color: textBlack,
      fontSize: 14,
      fontFamily: "Gilroy-Regular",
    },
    label: {
      fontSize: 16,
      fontFamily: "Gilroy-SemiBold",
    },
    row: {
      flexDirection: "row",
    }
  });
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.row}>
        {renderTypeContact()}
        <View style={{ alignSelf: "center" }}>
          <Text style={[styles.label, { color: textBlack }]}>
            {data.name}
          </Text>
          {renderTypeDescription()}
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ alignItems: "flex-end" }}>
          {renderTypePrice()}
          <Text style={styles.descriptionType}>
            {formattedDate}
          </Text>
        </View>
        <Right name="chevron-small-right" color={textBlack} size={35} />
      </View>
    </TouchableOpacity>
  );
};

export default DebtContactCard;
