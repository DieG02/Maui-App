import { Alert } from "react-native";

export const alertDelete = (text: string, fnConfirm: any) => {
    Alert.alert(
        "Eliminar",
        text,
        [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Eliminar",
                onPress: () => fnConfirm()
            },
        ]
    );
};