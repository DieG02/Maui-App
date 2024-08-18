import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import { NavigationProp } from '@react-navigation/native';
import customStyles from '../../styles/customStyles';
import Spacer from '../../components/common/Spacer';
import Form from '../../components/Library/Form';
import CommonInput from '../../components/common/CommonInput';
import SelectionModal from '../../components/common/Modals/SelectionModal';
import Toggle from '../../components/common/Toggle';
import { View } from 'react-native';
import Button from '../../components/common/Button';

const { textBlack, disabled, marginHorizontal, white } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
}

const NewFinancialAccount = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <BackHeaderTitle onPressBack={() => navigation.goBack()} label={'Crear Cuenta'} color={textBlack} />
      <Spacer height={10} />
      <Form>
        <SelectionModal
          placeholder={'Selecciona una Moneda'}
          name={'Moneda'}
          required
          value={''}
          marginBottom={15}
          onPress={() => {
            console.log('Modal Currency');
          }}
          onPressClose={() => {
            console.log('Close Modal Currency');
          }}
        />
        <CommonInput
          placeholder='Monto'
          name={'Monto'}
          marginBottom={15}
          value={''}
          setValue={() => console.log('Monto')}
        />
        <CommonInput
          placeholder='Nombre'
          name={'Nombre'}
          required
          marginBottom={15}
          value={''}
          setValue={() => console.log('Nombre')}
        />
        <Toggle />
      </Form>
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: marginHorizontal,
          marginBottom: 40,
        }}
      >
        <Button
          disabled={true}
          onPress={() => console.log('hello')}
          text={'Registrar Venta'}
          color={white}
          style={{ backgroundColor: disabled }}
        />
      </View>
    </ScreenContainer>
  );
};

export default NewFinancialAccount;
