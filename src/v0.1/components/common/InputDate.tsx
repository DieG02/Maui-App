import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import customStyles from "../../styles/customStyles";
import Icon from "react-native-vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import "moment-timezone";
import { parseDDMM, parseYYMMDD } from "../../utils/helper";

const { textBlack } = customStyles;

interface Props {
  name: string;
  date: string;
  setDate: (value: string) => void;
  color: string;
}

interface IDate {
  label: string;
  value: string;
}
const TODAY = moment.parseZone().toISOString();
const YESTERDAY = moment.parseZone().subtract(1, "days").toISOString();

const DATES = [
  { label: "Hoy", value: TODAY },
  { label: "Ayer", value: YESTERDAY },
];

const InputDate = ({ name, setDate, date, color }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const indicatorDate = moment(date).toDate();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const clasifyDate = (date: string) => {
    if (parseYYMMDD(date) === parseYYMMDD(TODAY)) {
      setDate(TODAY);
      setIsOpen(true);
    } else if (parseYYMMDD(date) === parseYYMMDD(YESTERDAY)) {
      setDate(YESTERDAY);
      setIsOpen(true);
    } else {
      setDate(date);
      setIsOpen(false);
    }
  }

  useEffect(()=>{
    clasifyDate(date);
  },[date])

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const OTHER_DAY = moment(date).parseZone();
    clasifyDate(OTHER_DAY.toISOString());
    hideDatePicker();
  };

  const handleDateChange = (date: IDate) => {
    setDate(date.value);
    setIsOpen(true);
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          color: textBlack,
          fontFamily: "Gilroy-Bold",
          marginBottom: 10,
        }}
      >
        {name}
      </Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {DATES.map((d, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDateChange(d)}
            style={{
              backgroundColor: date === d.value ? color : "white",
              borderColor: color,
              borderWidth: date === d.value ? 0 : 1.5,
              paddingHorizontal: 20,
              marginRight: 10,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: date === d.value ? "white" : color,
                fontFamily: "Gilroy-Bold",
              }}
            >
              {d.label}
            </Text>
          </TouchableOpacity>
        ))}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={indicatorDate}
        />
        {isOpen ? (
          <TouchableOpacity
            onPress={showDatePicker}
            style={{
              display: "flex",
              flexDirection: "row",
              borderColor: color,
              borderWidth: 1.5,
              borderRadius: 20,
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            <Icon name="calendar" size={25} color={color} />
            <Text
              style={{
                fontSize: 16,
                color: color,
                marginLeft: 10,
                fontFamily: "Gilroy-Bold",
              }}
            >
              Eligir fecha
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={showDatePicker}
            style={{
              backgroundColor: color,
              paddingHorizontal: 20,
              borderRadius: 20,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontFamily: "Gilroy-Bold",
              }}
            >
              {parseDDMM(date)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputDate;
