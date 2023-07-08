import React from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import customStyles from "../../styles/customStyles";
import EditDebtForm from "../../components/common/EditDebtForm";

const { mainColor } = customStyles;

interface Props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const EditDebt = ({ navigation, route }: Props) => {

    const { params } = route;

    return (
        <ScreenContainer>
        <BackHeaderTitle
            label="Editar Deuda"
            onPressBack={() => navigation.goBack()}
            hasType
            color={mainColor}
        />
            <EditDebtForm navigation={navigation} data={params}/>
        </ScreenContainer>
    );
};
export default EditDebt;
