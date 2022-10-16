import { View, StatusBar, Image } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import React, {useState, useEffect} from "react";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import Spacer from "../../components/common/Spacer";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import Button from "../../components/common/Button";
import { userBussiness, options } from "../../services/bussiness";
import ImageBussiness from "../../components/common/ImageBussiness";

interface Props {
    navigation: NavigationProp<any, any>;
}

const statusBarStyle = "dark-content";
const {disabledBtnColor, mainColor} = globalStyles;
const {nameBussinesss, phoneBussiness, ubicacionBussiness, emailBussiness, img} = userBussiness;

const UserBussiness = ({navigation}: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [selectOption, setSelectOption] = useState("Seleccione una tipo de negocio");
    const [infoBussiness, setInfoBussiness]  = useState({
        name: nameBussinesss,
        phone: phoneBussiness,
        ubicacion: ubicacionBussiness,
        email: emailBussiness,
    });
    const infoBussinessRef = {
        name: nameBussinesss,
        phone: phoneBussiness,
        ubicacion: ubicacionBussiness,
        email: emailBussiness,
    };
    const selectOptionRef  = "Seleccione una tipo de negocio";

    useEffect(() => {
        const textChange = JSON.stringify(infoBussiness) == JSON.stringify(infoBussinessRef);
        const optionChange = selectOption == selectOptionRef;
        textChange?setDisabledBtn(!textChange):setDisabledBtn(!textChange)
        !optionChange&&setDisabledBtn(true);
    }, [infoBussiness.name, infoBussiness.phone, infoBussiness.ubicacion, infoBussiness.email, selectOption])

    const colorBtn = !disabledBtn?disabledBtnColor:mainColor;

  return (
    <ScreenContainer>
        <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
        <BackHeaderTitle
          label="Mi Negocio"
          onPressBack={() => navigation.goBack()}
        />
        <View style={{ marginHorizontal: 20 }}>
            <Spacer height={10} />
            <ImageBussiness url={img} name={infoBussiness.name}/>
            <Spacer height={10} />
            <CommonInput value={infoBussiness.name} setValue={(value) => setInfoBussiness({ ...infoBussiness, name: value})} name="Nombre del negocio"  marginBottom={20} autoCapitalize="words"/>
            <Spacer height={5} />
            <OptionModal options={options} isModalVisible={modalVisible} setIsModalVisible={setModalVisible} title="Tipo de negocio" selectedOption={selectOption} setSelectedOption={setSelectOption}/>
            <Spacer height={5} />
            <CommonInput value={infoBussiness.email} setValue={(value) => setInfoBussiness({ ...infoBussiness, email: value})} name="Correo del negocio"  marginBottom={20} keyboardType="email-address"/>
            <Spacer height={5} />
            <CommonInput value={infoBussiness.ubicacion} setValue={(value) => setInfoBussiness({ ...infoBussiness, ubicacion: value})} name="Ubicación"  marginBottom={20} autoCapitalize="words"/>
            <Spacer height={5} />
            <CommonInput value={infoBussiness.phone} setValue={(value) => setInfoBussiness({ ...infoBussiness, phone: value})} name="Celular"  marginBottom={20} keyboardType="phone-pad"/>
            <Spacer height={10} />
            <View>
                <Button text="Guardar" disabled={!disabledBtn} style={{backgroundColor: colorBtn}}/>
            </View>
        </View>
    </ScreenContainer>
  );
};

export default UserBussiness;
