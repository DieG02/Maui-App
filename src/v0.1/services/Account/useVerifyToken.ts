import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';

export const VERIFY_TOKEN: string = 'VERIFY_TOKEN';

export const verfiyToken = async () => {
  await setHeaders();
  const response = await MauiApi.post('/verifyToken');
  return response.data;
};

const useVerifyToken = () => {
  const { reset } = useNavigation<any>();
  return useQuery([VERIFY_TOKEN] as QueryKey, verfiyToken, {
    onSuccess: data => {
      //   reset({
      //     index: 0,
      //     routes: [{ name: 'Splash' }],
      //   });
      console.log(data);
    },
  });
};
export default useVerifyToken;
