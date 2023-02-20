import { View, Text, Image } from "react-native";
import React from "react";
import { getInitialLetters } from "../../../utils/helper";
import styles from "./style";

// TODO: Refactor this interface to use the correct types
interface Props {
  user: any;
  size?: "small" | "large";
}

const ProfileBadge = ({ user, size = "small" }: Props) => {
  return user.image ? (
    <Image
      source={{ uri: user.image }}
      resizeMode="contain"
      style={styles(size).image}
    />
  ) : (
    <View style={styles(size).wrapper}>
      <Text style={styles(size).text}>{getInitialLetters(user.name)}</Text>
    </View>
  );
};

export default ProfileBadge;
