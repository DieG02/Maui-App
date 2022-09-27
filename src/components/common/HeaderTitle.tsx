import { View, Text } from "react-native";
import React from "react";
import globalStyles from "../../styles/globalStyles";
import Icon from "./Icon";
import Search from "react-native-vector-icons/Feather";
import Arrow from "react-native-vector-icons/Ionicons";

const { secondaryColor, background, white, textBlack } = globalStyles;

interface SimpleProps {
  label: string;
  onPressSearch?: () => void;
  withSearch?: boolean;
}
interface Props extends SimpleProps {
  onPressBack: () => void;
  hasType?: boolean;
  color?: string;
}

export const HeaderTitle = ({
  label,
  withSearch,
  onPressSearch,
}: SimpleProps) => {
  return (
    <View
      style={{
        backgroundColor: background,
        height: 60,
        paddingLeft: 30,
        justifyContent: "space-between",
        paddingRight: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontFamily: "Gilroy-Bold",
          color: textBlack,
        }}
      >
        {label}
      </Text>
      {withSearch && (
        <Icon onPress={onPressSearch}>
          <Search name="search" size={25} color={textBlack} />
        </Icon>
      )}
    </View>
  );
};

export const BackHeaderTitle = ({
  label,
  withSearch,
  onPressSearch,
  onPressBack,
  hasType,
  color,
}: Props) => {
  return (
    <View
      style={{
        backgroundColor: hasType ? color : background,
        height: 60,
        paddingLeft: 15,
        justifyContent: "space-between",
        paddingRight: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon onPress={onPressBack}>
          <Arrow
            name="arrow-back"
            size={30}
            color={hasType ? white : secondaryColor}
          />
        </Icon>
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Gilroy-Bold",
            color: hasType ? white : secondaryColor,
            paddingLeft: 10,
          }}
        >
          {label}
        </Text>
      </View>
      {withSearch && (
        <Icon onPress={onPressSearch}>
          <Search
            name="search"
            size={25}
            color={hasType ? white : secondaryColor}
          />
        </Icon>
      )}
    </View>
  );
};
