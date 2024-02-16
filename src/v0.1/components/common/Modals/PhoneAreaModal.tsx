import React from 'react';
import { ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import customStyles from '../../../styles/customStyles';
import OptionCountrySelect from '../OptionCountrySelect';
import PrefixInput from '../PrefixInput';
import { countryList } from '../../../helpers/countryList';
import useToggle from '../../../hooks/useToggle';

const { mainColor, white, ligthBlue, blueSelected } = customStyles;
interface Props {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const OptionModal = ({ selectedOption, setSelectedOption }: Props) => {
  const { toggle, setToggle, value } = useToggle(false);
  const countryInfo = countryList.find((item: any) => item.isoCode === selectedOption);

  const handleModal = (option: string) => {
    setSelectedOption(option);
    toggle();
  };

  return (
    <View>
      <Modal
        scrollOffset={100}
        isVisible={value}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => setToggle(false)}
        onSwipeComplete={() => setToggle(false)}
        onBackButtonPress={() => setToggle(false)}
      >
        <View
          style={{
            backgroundColor: white,
            marginHorizontal: 10,
            borderRadius: 15,
            height: 400,
          }}
        >
          <ScrollView>
            <View style={{ marginVertical: 10 }}>
              {countryList.map((option, index) => (
                <OptionCountrySelect
                  key={index}
                  name={option.countryName}
                  flag={option.isoCode}
                  prefix={option.countryPrefix}
                  backgroundColor={selectedOption === option.isoCode ? ligthBlue : white}
                  textColor={selectedOption === option.isoCode ? mainColor : blueSelected}
                  onPress={() => handleModal(option.isoCode)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <PrefixInput value={countryInfo} marginBottom={25} onPress={() => setToggle(true)} />
    </View>
  );
};

export default OptionModal;
