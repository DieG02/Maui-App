import { View, Text, Image } from "react-native";
import React from "react";
import { getInitialLetters } from "../../../utils/helper";
import styles from "./style";

// TODO: Refactor this interface to use the correct types
interface Props {
  userName: string;
  imgProfile?: string;
  size?: "small" | "large";
}

const ProfileBadge = ({
  userName,
  imgProfile,
  size = "small",
}: Props) => {
  return imgProfile ? (
    <Image
      source={{ uri: imgProfile }}
      resizeMode="contain"
      style={styles(size).image}
    />
  ) : (
    <View style={styles(size).wrapper}>
      <Text style={styles(size).text}>
        {getInitialLetters(userName)}
      </Text>
    </View>
  );
};

export default ProfileBadge;
