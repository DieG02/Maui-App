import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import Modal from "react-native-modal";
import MenuIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Entypo";
import theme from "../styles/themeStyles";
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";

export default function ModalTest({ name, price, color, icon, type, state }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        useNativeDriver={true}
        swipeDirection={["down"]}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        style={styles.view}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 400,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <View
            style={{
              alignItems: "center",
              height: 40,
              justifyContent: "center",
            }}
          >
            <Icon name="chevron-small-down" color="#302F3C" size={30} />
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 10,
              backgroundColor: "green",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#ECECED",
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon2 name="pen" size={25} color="#ACACAC" />
            </TouchableOpacity>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginHorizontal: 15,
                backgroundColor: color || "#3784F9",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon1 name={icon} size={35} color="white" />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#ECECED",
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon2 name="trash" size={25} color="#ACACAC" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20 }}>{type}</Text>
            <Text style={{ fontSize: 40, color: "#131313" }}>{price}</Text>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => toggleModal()}>
        <View style={styles.root}>
          <View style={[theme.row]}>
            <View style={theme.row}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  backgroundColor: color || "#3784F9",
                  marginRight: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon1 name={icon} size={20} color="white" />
              </View>
              <View style={theme.column}>
                <Text style={theme.h2}>{name}</Text>
                <Text style={theme.p}>{type}</Text>
              </View>
            </View>
            <View style={[theme.column, { alignItems: "flex-end" }]}>
              <Text style={theme.h1}>{price}</Text>
              <Text style={theme.p}>{state}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  root: {
    height: 70,
    backgroundColor: "white",
  },
});
