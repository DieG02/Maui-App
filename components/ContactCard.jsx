import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ContactCard({ phone, name, type }) {
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
            <Icon name="user" size={30} color="#3784F9" />
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
            <Icon name="truck" size={30} color="#3784F9" />
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
            <Icon name="group" size={30} color="#3784F9" />
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
        <Text style={{ color: "#131313" }}>{name}</Text>
      </View>
      <Text style={{ color: "#131313" }}>{phone}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
