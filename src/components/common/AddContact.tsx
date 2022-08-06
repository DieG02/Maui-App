import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { createContactBodyInputDto } from "../../../../Maui-Backend/src/controllers/types";
import useMatchContact from "../../hooks/useMatchContact";
import { createNewContact } from "../../services/contacts";
import globalStyles from "../../styles/globalStyles";

interface Props {
  data: IContact;
  type: createContactBodyInputDto["typeOfContact"];
}

const { mainColor } = globalStyles;

const AddContact = ({ data, type }: Props) => {
  const { isAdded } = useMatchContact(data.phone);
  const queryClient = useQueryClient();

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
      onSuccess: () => {
        queryClient.invalidateQueries("clients");
        queryClient.invalidateQueries("providers");
      },
    }
  );

  return (
    <TouchableOpacity
      onPress={() => !isAdded && mutateAsync(form)}
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
            color: "#131313",
            fontSize: 16,
            fontFamily: "Gilroy-SemiBold",
          }}
        >
          {data.name}
        </Text>
        <Text
          style={{
            color: "#131313",
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
            <ActivityIndicator size="small" color="#131313" />
          </View>
        ) : (
          <View>
            {isAdded ? (
              <Text
                style={{
                  color: mainColor,
                  fontSize: 16,
                  fontFamily: "Gilroy-SemiBold",
                }}
              >
                Importado
              </Text>
            ) : (
              <Text
                style={{
                  color: "#131313",
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
