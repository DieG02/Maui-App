import { Image, Text, View } from "react-native";
import React from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import RowTransaction from "../../components/common/TransactionCard/RowTransaction";
import ScrollContainer from "../../components/containers/ScrollContainer";
import { parseDDMMYY } from "../../utils/helper";

// TODO: Refactor this component
interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
  type: string;
}
const { secondaryColor, textBlack } =
  customStyles;

const DebtDetail = ({ route, navigation }: Props) => {
  const { params } = route;
  console.log(params);

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label="Detalle de operación"
        onPressBack={() => navigation.goBack()}
        withDelete
        onPressDelete={() => console.log('Borrar deuda')}
      />

      <ScrollContainer>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: secondaryColor,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20,
            }}
          >
            <Image
              source={{
                uri: params?.item?.imageUrl ?
                  params?.item?.imageUrl :
                  "https://cdn-icons-png.flaticon.com/512/1255/1255986.png?w=1380&t=st=1654300895~exp=1654301495~hmac=45b46434561dc28bf1924a2c7388c4835ac5f91b59a7ce3f624f943d80d7e98c"
              }}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              color: textBlack,
              fontFamily: "Gilroy-SemiBold",
            }}
            numberOfLines={1}
          >
            {
              params?.type === 'debt' ?
                params?.item.name: `Abono del ${parseDDMMYY(params?.item.paidAt)}`
            }
          </Text>
        </View>

        <RowTransaction
          label="Fecha de operación"
          value={parseDDMMYY(params?.item.paidAt)}
        />
        <RowTransaction
          label="Método de pago"
          value={ params?.type === 'debt' ?
            'Deuda' : params?.item.paymentMethod
          }
        />
        <RowTransaction
          label="Total"
          value={
            params?.type === "debt" ? (
              <Text numberOfLines={1}>
              {params?.item.value.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
              })}
              </Text>
            ) : (
              <Text numberOfLines={1}>
              -
              {params?.item.amount.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
              })}
              </Text>
          )}
        />
      </ScrollContainer>

    </ScreenContainer>
  );
};

export default DebtDetail;
