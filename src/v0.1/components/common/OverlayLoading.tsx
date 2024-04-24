import { View, ActivityIndicator } from 'react-native';
import customStyles from '../../styles/customStyles';

interface Props {
  isLoading: boolean;
}

const { textBlack, height, width, mainColor } = customStyles;

export default function OverlayLoading({ isLoading }: Props) {
  if (isLoading)
    return (
      <View
        style={{
          opacity: 0.2,
          backgroundColor: textBlack,
          position: 'absolute',
          height: height,
          width: width,
          zIndex: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator style={{ opacity: 1 }} size='large' color={mainColor} />
      </View>
    );
}
