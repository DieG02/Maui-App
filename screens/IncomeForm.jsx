import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import Icon from "../components/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Fab from "../components/Fab";
import ButtonInput from "../components/ButtonInputForm";
import Calendar from "react-native-vector-icons/Entypo";
import Tag from "react-native-vector-icons/AntDesign";
import Costumer from "react-native-vector-icons/FontAwesome";
import Wallet from "react-native-vector-icons/Entypo";
import Money from "react-native-vector-icons/FontAwesome5";
import Description from "react-native-vector-icons/FontAwesome";
import Dollar from "react-native-vector-icons/FontAwesome";
import InputForm from "../components/InputForm";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width } = Dimensions.get("window");

export default function IncomeForm({ navigation }) {
  const [paid, setPaid] = useState(true);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fecha, setfecha] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  console.log(paid);
  console.log(price);
  console.log(description);

  const month = fecha.getUTCMonth() + 1;
  const day = fecha.getUTCDate();
  const year = fecha.getUTCFullYear();

  const newdate = year + "/" + month + "/" + day;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setfecha(date);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <Header
        name="Nuevo Ingreso"
        color="#f8f8f8"
        icon={
          <Icon onPress={() => navigation.goBack()}>
            <Arrow name="arrow-back" size={30} color="#3784F9" />
          </Icon>
        }
      ></Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 40,
        }}
      >
        <View style={{}}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => setPaid(true)}
              style={{
                backgroundColor: paid == true ? "#3784F9" : "#E6EFF8",
                width: (width - 100) / 2,
                height: 50,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: paid == true ? "white" : "#3784F9",
                  fontWeight: "bold",
                }}
              >
                Pagado
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPaid(false)}
              style={{
                backgroundColor: paid == false ? "#3784F9" : "#E6EFF8",
                width: (width - 100) / 2,
                height: 50,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: paid == false ? "white" : "#3784F9",
                  fontWeight: "bold",
                }}
              >
                Deuda
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#E6EFF8",
              height: 50,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#3784F9",
                fontWeight: "bold",
              }}
            >
              Seleccionar Productos
            </Text>
          </TouchableOpacity>

          <InputForm
            name="Valor"
            keyboardType="numeric"
            placeholder="Valor"
            value={price}
            setValue={setPrice}
          >
            <Dollar name="dollar" size={30} color="#3784F9" />
          </InputForm>
          <InputForm
            name="Descripción"
            keyboardType="default"
            placeholder="Concepto"
            value={description}
            setValue={setDescription}
          >
            <Description name="file-text" size={30} color="#3784F9" />
          </InputForm>
          <ButtonInput text="Fecha" name="Fecha" onPress={showDatePicker}>
            <Calendar name="calendar" size={30} color="#3784F9" />
          </ButtonInput>
          <Text>{newdate}</Text>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <ButtonInput text="Clientes" name="Clientes">
            <Costumer name="user" size={30} color="#3784F9" />
          </ButtonInput>
          <ButtonInput text="Categoria" name="Categoria">
            <Tag name="tag" size={30} color="#3784F9" />
          </ButtonInput>
          <ButtonInput text="Cuentas" name="Cuentas">
            <Wallet name="wallet" size={30} color="#3784F9" />
          </ButtonInput>
          <ButtonInput text="Forma de Pago" name="Forma de Pago" bottom={80}>
            <Money name="money-bill" size={30} color="#3784F9" />
          </ButtonInput>
        </View>
      </ScrollView>
      <Fab
        bottom={0}
        left={0}
        width={width - 40}
        marginLeft={20}
        color="#33E69B"
        text="Guardar"
        onPress={() => alert("Crear Producto")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
