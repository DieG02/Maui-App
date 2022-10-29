import { View, StatusBar } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";
import React, { useState } from "react";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { NavigationProp } from "@react-navigation/native";
import globalStyles from "../../styles/globalStyles";
import Spacer from "../../components/common/Spacer";
import CommonInput from "../../components/common/CommonInput";
import OptionModal from "../../components/common/OptionModal";
import Button from "../../components/common/Button";
import { bussinessData, options } from "../../services/bussiness";
import ImageBussiness from "../../components/common/ImageBussiness";

const statusBarStyle = "dark-content";
const { mainColor } = globalStyles;
interface Props {
  navigation: NavigationProp<any, any>;
}

const UserBussiness = ({ navigation }: Props) => {
  const [bussinessInfo, setBussinessInfo] = useState(bussinessData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectOption, setSelectOption] = useState(
    "Seleccione una tipo de negocio"
  );
  const selectOptionRef = "Seleccione una tipo de negocio";

  const isChanged =
    JSON.stringify(bussinessData) !== JSON.stringify(bussinessInfo);
  const isOptionChanged = selectOption !== selectOptionRef;
  const enabled = !isChanged && !isOptionChanged;

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor="white" />
      <BackHeaderTitle
        label="Mi Negocio"
        onPressBack={() => navigation.goBack()}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Spacer height={10} />
        <ImageBussiness url={bussinessInfo.img} name={bussinessInfo.name} />
        <Spacer height={10} />
        <CommonInput
          value={bussinessInfo.name}
          setValue={(value) =>
            setBussinessInfo({ ...bussinessInfo, name: value })
          }
          name="Nombre del negocio"
          marginBottom={20}
          autoCapitalize="words"
        />
        <Spacer height={5} />
        <OptionModal
          options={options}
          isModalVisible={modalVisible}
          setIsModalVisible={setModalVisible}
          title="Tipo de negocio"
          selectedOption={selectOption}
          setSelectedOption={setSelectOption}
        />
        <Spacer height={5} />
        <CommonInput
          value={bussinessInfo.email}
          setValue={(value) =>
            setBussinessInfo({ ...bussinessInfo, email: value })
          }
          name="Correo del negocio"
          marginBottom={20}
          keyboardType="email-address"
        />
        <Spacer height={5} />
        <CommonInput
          value={bussinessInfo.ubicacion}
          setValue={(value) =>
            setBussinessInfo({ ...bussinessInfo, ubicacion: value })
          }
          name="Ubicación"
          marginBottom={20}
          autoCapitalize="words"
        />
        <Spacer height={5} />
        <CommonInput
          value={bussinessInfo.phone}
          setValue={(value) =>
            setBussinessInfo({ ...bussinessInfo, phone: value })
          }
          name="Celular"
          marginBottom={20}
          keyboardType="phone-pad"
        />
        <Spacer height={10} />
        <View>
          <Button
            text="Guardar"
            disabled={enabled}
            style={{ backgroundColor: !enabled ? mainColor : "#B3B3B3" }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default UserBussiness;
