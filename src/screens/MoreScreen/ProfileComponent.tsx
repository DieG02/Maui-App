import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../../styles/globalStyles";
import {getInitialLetters} from "../../utils/helper";

const {textBlack} = globalStyles

interface Props{
  userName: string,
  userLastName: string,
  imgProfile?: string,
  email: string,
}

const ProfileComponent = ({userName, userLastName, imgProfile, email }:Props) => {
  const renderImage = (visible?:string) =>{
    if(visible){
      return(
        <Image
          source={{uri: imgProfile }}
          resizeMode="contain"
          style={{
            width:"100%",
            height:"100%",
            borderRadius: 40
          }}
        />
      )
    }
    else if(!visible){
      return(
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {getInitialLetters(userName, userLastName)}
        </Text>
      )
    }
  }

  return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                marginRight: 20,
                backgroundColor: "#7888a8",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            {renderImage(imgProfile)}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: "#131313",
                  fontWeight: "bold",
                  fontFamily: "Gilroy-Medium",
                }}
              >
                {userName} {userLastName}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: textBlack,
                    fontFamily: "Gilroy-Regular",
                    fontSize: 15,
                  }}
                >
                  {email}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
  );
};

export default ProfileComponent;
