import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import customStyles from '../../styles/customStyles';

interface Props {
  createdAt: Date;
  name?: string;
  value: number;
  paymentMethod?: PaymentMethod;
  icon?: string;
}

const { secondaryColor, textBlack, textLight } = customStyles;

const DebtTypeCard = ({ createdAt, name, value, paymentMethod, icon }: Props) => {
  moment.locale('es');
  const formattedDate = moment(createdAt).format('DD [de] MMMM');
  const methods: any = {
    CASH: 'Efectivo',
    CARD: 'Tarjeta',
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text>{icon && icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.mainContent}>{name || 'Se pago'}</Text>
        <Text style={styles.subContent}>{formattedDate}</Text>
      </View>
      <View style={styles.payment}>
        <Text style={styles.mainContent} numberOfLines={1}>
          {value.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
          })}
        </Text>
        <Text style={styles.subContent}>{paymentMethod && methods[paymentMethod]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 15,
  },
  icon: {
    minWidth: 50,
    minHeight: 50,
    borderRadius: 25,
    backgroundColor: secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  mainContent: {
    color: textBlack,
    fontWeight: 'bold',
  },
  subContent: {
    color: textLight,
  },
  payment: {
    width: '20%',
    alignItems: 'flex-end',
  },
});

export default DebtTypeCard;
