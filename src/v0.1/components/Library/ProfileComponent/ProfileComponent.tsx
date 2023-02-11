import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import customStyles from "../../../styles/customStyles";
import Spacer from "../../common/Spacer";
import ProfileBadge from "../ProfileBadge";
import styles from "./style";

const { textBlack } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  onPressUser: () => void;
  userName?: string;
  imgProfile?: string;
  user: any;
}

const ProfileComponent = ({ onPressUser, user }: Props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onPressUser} style={styles.container}>
        <ProfileBadge user={user} size="small" />
        <Spacer width={10} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Gilroy-SemiBold",
            color: textBlack,
          }}
        >
          Hola {user.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileComponent;
