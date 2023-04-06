import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";

interface Props {
    name: string;
    image: string;
    backgroundColor: string;
    textColor: string;
    onPress: () => void;
}

const OptionItemWithIcon = ({ name, image, backgroundColor, textColor, onPress }: Props) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: backgroundColor,
                height: 55,
                borderRadius: 15,
                marginHorizontal: 20,
                marginVertical: 5,
                justifyContent: "flex-start",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                paddingLeft: 15
            }}
        >
            <Image
                source={{ uri: image}}
                style={{
                    width: 25,
                    height: 25
                }}
            />
            <Text
                style={{
                    marginLeft: 15,
                    color: textColor,
                    fontFamily: "Gilroy-Bold",
                }}
            >
                {name}
            </Text>
        </TouchableOpacity>
    );
};

export default OptionItemWithIcon;
