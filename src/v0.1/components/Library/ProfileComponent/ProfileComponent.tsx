import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import customStyles from '../../../styles/customStyles';
import Spacer from '../../common/Spacer';
import ProfileBadge from '../ProfileBadge';
import styles from './style';
import { useTranslation } from 'react-i18next';

const { textBlack } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  onPressUser: () => void;
  user: any;
}

const ProfileComponent = ({ onPressUser, user }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onPressUser} style={styles.container}>
        <ProfileBadge user={user} size='small' />
        <Spacer width={10} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Gilroy-SemiBold',
            color: textBlack,
          }}
        >
          {`${t('home_stack.welcome')} ${user.name}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileComponent;
