import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import Header from "../components/Header";
import Icon from "../components/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Fab from "../components/Fab";
import ButtonInput from "../components/ButtonInput";
import Calendar from "react-native-vector-icons/Entypo";
import Tag from "react-native-vector-icons/AntDesign";
import Costumer from "react-native-vector-icons/FontAwesome";
import Wallet from "react-native-vector-icons/Entypo";
import Money from "react-native-vector-icons/FontAwesome5";
import Description from "react-native-vector-icons/FontAwesome";
import Dollar from "react-native-vector-icons/FontAwesome";
import Check from "react-native-vector-icons/Feather";
import InputForm from "../components/InputForm";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Switch } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default function OutcomeForm({ navigation }) {
  const [paid, setPaid] = useState(true);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fecha, setfecha] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [more, setMore] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const seeMore = () => setMore(!more);

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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#FD6363" />
      <View
        style={{
          backgroundColor: "#FD6363",
          height: 140,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        <Header
          titleColor="white"
          name="Nuevo Egresos"
          color="#FD6363"
          icon={
            <Icon onPress={() => navigation.goBack()}>
              <Arrow name="arrow-back" size={30} color="white" />
            </Icon>
          }
        />
        <Text
          style={{
            marginHorizontal: 40,
            fontSize: 16,
            color: "white",
          }}
        >
          Valor del Egreso
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 40,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              height: 40,
            }}
          >
            $
          </Text>
          <InputForm
            keyboardType="numeric"
            placeholder="0,00"
            value={price}
            setValue={setPrice}
            focus={true}
            horizontal={5}
            style={{
              backgroundColor: "#FD6363",
              marginTop: 0,
              height: 55,
            }}
            textStyle={{
              color: "white",
              fontSize: 30,
              fontWeight: "bold",
            }}
          ></InputForm>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 40,
        }}
      >
        <View
          style={{
            height: height - 150,
            justifyContent: "space-between",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={onToggleSwitch}
              style={{
                marginTop: 20,
                borderColor: "#ECECED",
                borderWidth: 1.8,
                height: 50,
                borderRadius: 10,
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <Check name="check-circle" size={25} color="#9F9F9F" />
              {isSwitchOn ? (
                <Text style={{ color: "#413F3F" }}>Pagado</Text>
              ) : (
                <Text>Pendiente</Text>
              )}
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                color="#FD6363"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 20,
                paddingHorizontal: 20,
                borderColor: "#ECECED",
                borderWidth: 1.8,
                height: 50,
                borderRadius: 10,
                alignItems: "center",

                flexDirection: "row",
              }}
            >
              <Tag name="inbox" size={25} color="#9F9F9F" />
              <Text
                style={{
                  marginLeft: 40,
                  color: "#9F9F9F",
                  fontWeight: "bold",
                }}
              >
                Seleccionar Productos
              </Text>
            </TouchableOpacity>

            <InputForm
              keyboardType="default"
              placeholder="Concepto"
              value={description}
              setValue={setDescription}
              bottom={10}
              focus={false}
              style={{
                borderColor: "#ECECED",
                borderWidth: 1.8,
                height: 50,
                backgroundColor: "white",
                marginTop: 20,
              }}
            >
              <Description name="file-text" size={25} color="#9F9F9F" />
            </InputForm>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <ButtonInput
              name="Fecha"
              onPress={showDatePicker}
              value={newdate}
              bottom={10}
            >
              <Calendar name="calendar" size={25} color="#9F9F9F" />
            </ButtonInput>
            <ButtonInput name="Categoria" bottom={10}>
              <Tag name="tag" size={25} color="#9F9F9F" />
            </ButtonInput>

            {more ? (
              <>
                <ButtonInput name="Clientes" bottom={10}>
                  <Costumer name="user" size={25} color="#9F9F9F" />
                </ButtonInput>

                <ButtonInput name="Cuentas" bottom={10}>
                  <Wallet name="wallet" size={25} color="#9F9F9F" />
                </ButtonInput>
                <ButtonInput name="Forma de Pago" bottom={10}>
                  <Money name="money-bill" size={25} color="#9F9F9F" />
                </ButtonInput>
              </>
            ) : (
              <TouchableOpacity
                onPress={seeMore}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{ color: "#FD6363", fontSize: 18, fontWeight: "bold" }}
                >
                  Ver más detalles
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Fab
            bottom={0}
            left={0}
            position="relative"
            color="#FD6363"
            text="Guardar"
            onPress={() => alert("Crear Producto")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
