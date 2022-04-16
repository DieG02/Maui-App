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
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import Header from "../components/common/Header";
import Icon from "../components/common/Icon";
import Arrow from "react-native-vector-icons/Ionicons";
import Fab from "../components/common/Fab";
import ButtonInput from "../components/common/ButtonInput";
import Calendar from "react-native-vector-icons/Entypo";
import Costumer from "react-native-vector-icons/FontAwesome";
import Wallet from "react-native-vector-icons/Entypo";
import Money from "react-native-vector-icons/FontAwesome5";
import Description from "react-native-vector-icons/FontAwesome";
import Dollar from "react-native-vector-icons/FontAwesome";
import Check from "react-native-vector-icons/Feather";
import InputForm from "../components/common/InputForm";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Switch } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

interface Props {
  navigation: NavigationProp<any, any>;
}

const NewIncome = ({ navigation }: Props) => {
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

  const handleConfirm = (date: Date) => {
    console.log("A date has been picked: ", date);
    setfecha(date);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#33E69B" />
      <View
        style={{
          height: Platform.select({ ios: 52, android: 0 }),
          backgroundColor: Platform.select({ ios: "#33E69B" }),
        }}
      />
      <View
        style={{
          backgroundColor: "#33E69B",
          height: 140,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        <Header
          titleColor="white"
          name="Nuevo Ingreso"
          color="#33E69B"
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

            fontWeight: "bold",
          }}
        >
          Valor del Ingreso
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
              backgroundColor: "#33E69B",
              marginTop: 0,
              height: 55,
            }}
            textStyle={{
              color: "white",
              fontSize: 30,
              fontWeight: "bold",
            }}
          />
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
                color="#33E69B"
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
              <Check name="inbox" size={25} color="#9F9F9F" />
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

            {/* <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            /> */}
            <ButtonInput
              name="Fecha"
              onPress={showDatePicker}
              value={newdate}
              bottom={10}
            >
              <Calendar name="calendar" size={25} color="#9F9F9F" />
            </ButtonInput>
            <ButtonInput name="Categoria" bottom={10}>
              <Check name="tag" size={25} color="#9F9F9F" />
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
                  style={{ color: "#33E69B", fontSize: 18, fontWeight: "bold" }}
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
            color="#33E69B"
            text="Guardar"
            onPress={() => Alert.alert("Crear Producto")}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default NewIncome;
