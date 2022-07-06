import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../styles/globalStyles";
import Icon from "react-native-vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import "moment-timezone";

const { secondaryColor } = globalStyles;

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
const TODAY = moment.parseZone().format("DD-MM-YYYY");
const YESTERDAY = moment.parseZone().subtract(1, "days").format("DD-MM-YYYY");

const DATES = [
  { label: "Hoy", value: TODAY },
  { label: "Ayer", value: YESTERDAY },
];

const InputDate = ({ name, setDate, date, color }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const indicatorDate = moment(date, "DD-MM-YYYY").toDate();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const OTHER_DAY = moment(date).parseZone().format("DD-MM-YYYY");
    if (OTHER_DAY === TODAY) {
      setDate(TODAY);
      setIsOpen(true);
    } else if (OTHER_DAY === YESTERDAY) {
      setDate(YESTERDAY);
      setIsOpen(true);
    } else {
      setDate(OTHER_DAY);
      setIsOpen(false);
    }
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
          color: secondaryColor,
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
              borderWidth: date === d.value ? 0 : 1.8,
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
                fontSize: 18,
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
              borderWidth: 1.8,
              borderRadius: 20,
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            <Icon name="calendar" size={25} color={color} />
            <Text
              style={{
                fontSize: 18,
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
              {date.slice(0, 5)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputDate;
