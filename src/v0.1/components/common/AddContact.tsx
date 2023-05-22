import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { createContactBodyInputDto } from "../../../../../Maui-Backend/src/controllers/types";
import useMatchContact from "../../hooks/useMatchContact";
import { createNewContact } from "../../services/contacts";
import customStyles from "../../styles/customStyles";
import { queryClient } from "../../utils/queryClient";

interface Props {
  data: IContact;
  screen: string;
  type: createContactBodyInputDto["typeOfContact"];
  navigation: NavigationProp<any, any>;
}

const { textBlack, blueGrotto } = customStyles;

const AddContact = ({ data, type, screen, navigation }: Props) => {
  const { isAdded } = useMatchContact(data.phone);

  const handleOnPress = (data: IContact) => {
    if (screen === "NewIncome") {
      navigation.navigate("NewIncome", { contact: data });
    }
    if (screen === "NewExpense") {
      navigation.navigate("NewExpense", { contact: data });
    }
  };

  const form: createContactBodyInputDto = {
    name: data.name,
    phone: data.phone,
    comments: "",
    email: "",
    typeOfContact:
      type.toUpperCase() as createContactBodyInputDto["typeOfContact"],
  };
  const { mutateAsync, isLoading } = useMutation(
    (form: createContactBodyInputDto) => {
      return createNewContact(form);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("clients");
        queryClient.invalidateQueries("providers");
        handleOnPress(data);
      },
    }
  );

  return (
    <TouchableOpacity
      onPress={() => !isAdded && mutateAsync(form)}
      disabled={isAdded}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
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
        <Text
          style={{
            color: textBlack,
            fontSize: 14,
            fontFamily: "Gilroy-Regular",
          }}
        >
          {data.phone}
        </Text>
      </View>
      <View>
        {isLoading ? (
          <View style={{ width: 70 }}>
            <ActivityIndicator size="small" color={textBlack} />
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              width: 80,
            }}
          >
            {isAdded ? (
              <Text
                style={{
                  color: textBlack,
                  fontSize: 16,
                  fontFamily: "Gilroy-Bold",
                }}
              >
                Importado
              </Text>
            ) : (
              <Text
                style={{
                  color: blueGrotto,
                  fontSize: 16,
                  fontFamily: "Gilroy-SemiBold",
                }}
              >
                Importar
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AddContact;
