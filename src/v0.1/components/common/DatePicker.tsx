import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import customStyles from '../../styles/customStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { parseYYMMDD } from '../../utils/helper';
import moment from 'moment';
import 'moment/locale/pt';
import 'moment/locale/es';
import Icon from 'react-native-vector-icons/Feather';
import i18n from '../../services/i18n-config';
import { ellipsisText } from '../../utils/ellipsisText';

const { textBlack, secondaryColorBorder } = customStyles;

type Props = {
  name: string;
  value: string;
  setValue: (value: string) => void;
};

const TODAY = moment.parseZone().toISOString();
const YESTERDAY = moment.parseZone().subtract(1, 'days').toISOString();

const DatePicker = ({ name, value, setValue }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [textDate, setTextDate] = useState<string>('');
  const { t, language } = i18n;

  const indicatorDate = moment(value).toDate();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const clasifyDate = (date: string) => {
    const of = 'debt_stack.debt_screen.summary_text.of';
    const day = moment(date).date();
    const month = moment(date).locale(language).format('MMMM');

    if (parseYYMMDD(date) === parseYYMMDD(TODAY)) {
      setValue(TODAY);
      setTextDate(`${day} ${t(of)} ${month}`);
    } else if (parseYYMMDD(date) === parseYYMMDD(YESTERDAY)) {
      setValue(YESTERDAY);
      setTextDate(`${day} ${t(of)} ${month}`);
    } else {
      setValue(date);
      setTextDate(`${day} ${t(of)} ${month}`);
    }
  };

  const handleConfirm = (date: Date) => {
    const OTHER_DAY = moment(date).parseZone().toISOString();
    clasifyDate(OTHER_DAY);
    hideDatePicker();
  };

  useEffect(() => {
    clasifyDate(value);
  }, []);

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          color: textBlack,
          fontFamily: 'Gilroy-Bold',
          marginBottom: 10,
        }}
      >
        {name}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={indicatorDate}
      />
      <TouchableOpacity
        onPress={showDatePicker}
        style={{
          elevation: 0,
          borderRadius: 15,
          borderColor: secondaryColorBorder,
          margin: 0,
          marginBottom: 15,
          marginTop: 5,
          borderWidth: 1,
          height: 50,
          flexWrap: 'nowrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 8,
        }}
      >
        <Icon name='calendar' size={22} color={textBlack} />
        <Text
          style={{
            marginLeft: 10,
            color: textBlack,
            fontFamily: 'Gilroy-Bold',
          }}
        >
          {ellipsisText(textDate, 16, 3)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DatePicker;
