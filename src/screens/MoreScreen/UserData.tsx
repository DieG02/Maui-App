import { View, StatusBar, Image } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import React, {useState, useEffect} from "react";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import Spacer from "../../components/common/Spacer";
import CommonInput from "../../components/common/CommonInput";
import Button from "../../components/common/Button";
import { profileData } from "../../services/profiles";
import ImageProfile from "../../components/common/ImageProfile";

const statusBarStyle = "dark-content";
const {disabledBtnColor, mainColor} = globalStyles;
const {name, lastName, phone, email, img} = profileData;

interface Props {
    navigation: NavigationProp<any, any>;
  }

const UserData = ({navigation}: Props) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [userInfo, setUserInfo]  = useState({
        name: name,
        lastName: lastName,
        phone: phone,
        email: email,
    });
    const userInfoRef = {
        name: name,
        lastName: lastName,
        phone: phone,
        email: email,
    };

    useEffect(() => {
        const textChange = JSON.stringify(userInfo) == JSON.stringify(userInfoRef);
        textChange?setDisabledBtn(!textChange):setDisabledBtn(!textChange)
    }, [userInfo.name, userInfo.lastName, userInfo.phone, userInfo.email])

    const colorBtn = !disabledBtn?disabledBtnColor:mainColor;

    return (
    <ScreenContainer>
        <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
        <BackHeaderTitle
          label="Mis Datos"
          onPressBack={() => navigation.goBack()}
        />
        <View style={{ marginHorizontal: 20 }}>
            <Spacer height={10} />
            <ImageProfile url={img}/>
            <Spacer height={10} />
            <CommonInput value={userInfo.name} setValue={(value) => setUserInfo({ ...userInfo, name: value})} name="Nombre"  marginBottom={20} autoCapitalize="words"/>
            <Spacer height={5} />
            <CommonInput value={userInfo.lastName} setValue={(value) => setUserInfo({ ...userInfo, lastName: value})} name="Apellido"  marginBottom={20} autoCapitalize="words"/>
            <Spacer height={5} />
            <CommonInput value={userInfo.phone} setValue={(value) => setUserInfo({ ...userInfo, phone: value})} name="Numero de Celular"  marginBottom={20} keyboardType="phone-pad"/>
            <Spacer height={5} />
            <CommonInput value={userInfo.email} setValue={(value) => setUserInfo({ ...userInfo, email: value})} name="Correo"  marginBottom={20} keyboardType="email-address" autoCapitalize="none"/>
            <Spacer height={10} />
            <View>
                <Button text="Guardar" disabled={!disabledBtn} style={{backgroundColor: colorBtn}}/>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default UserData;