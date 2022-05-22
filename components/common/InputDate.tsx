import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../styles/globalStyles";
import Icon from "react-native-vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import "moment-timezone";

const { secondaryColor } = globalStyles;

interface Props {
  name: string;
}

const TODAY = moment.parseZone().format("DD-MM-YYYY");
const YESTERDAY = moment.parseZone().subtract(1, "days").format("DD-MM-YYYY");

const dates = [
  { label: "Hoy", value: TODAY },
  { label: "Ayer", value: YESTERDAY },
];

const InputDate = ({ name }: Props) => {
  const [date, setDate] = useState(TODAY);
  const [isOpen, setIsOpen] = useState(true);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const OTHER_DAY = moment(date).parseZone().format("DD-MM-YYYY");
    console.log(OTHER_DAY);
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

  const handleDateChange = (date: any) => {
    setDate(date.value);
    setIsOpen(true);
  };

  console.log("date ===>", date);

  const dateObject = moment(date, "DD-MM-YYYY").toDate();
  console.log("dateObject ===>", dateObject);

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
        {dates.map((d, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDateChange(d)}
            style={{
              backgroundColor: date === d.value ? "#33E69B" : "white",
              borderColor: "#33E69B",
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
                fontSize: 16,
                color: date === d.value ? "white" : "#33E69B",
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
          date={dateObject}
        />
        {isOpen ? (
          <TouchableOpacity
            onPress={showDatePicker}
            style={{
              borderColor: "#33E69B",
              borderWidth: 1.8,
              borderRadius: 20,
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="plus" size={30} color="#33E69B" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={showDatePicker}
            style={{
              backgroundColor: "#33E69B",
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
