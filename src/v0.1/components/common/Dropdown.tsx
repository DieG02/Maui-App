import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import customStyles from '../../styles/customStyles';
import Icon from './Icon';
import More from 'react-native-vector-icons/Entypo';

type Props = {
  options: any[];
};

const { background, textBlack } = customStyles;

function Dropdown({ options }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const closeDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleOption = (fn: () => void) => {
    setIsVisible(false);
    fn();
  };

  return (
    <View>
      {isVisible ? (
        <Modal transparent visible={isVisible} onRequestClose={closeDropdown}>
          <TouchableWithoutFeedback onPress={closeDropdown}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: background,
                  position: 'absolute',
                  top: 18,
                  right: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 17,
                  justifyContent: 'flex-start',
                  elevation: 4,
                  shadowColor: 'rgba(0, 0, 0, 0.50)',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                }}
              >
                {options.map(({ label, id, fn }) => (
                  <TouchableOpacity style={{ paddingVertical: 10 }} key={id} onPress={() => handleOption(fn)}>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: textBlack }}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : (
        <Icon onPress={() => setIsVisible(!isVisible)}>
          <More name='dots-three-vertical' size={25} color={textBlack} />
        </Icon>
      )}
    </View>
  );
}

export default Dropdown;
