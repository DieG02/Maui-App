import MauiApi from '../../clientProvider';
import { QueryKey, useQuery } from 'react-query';

export const VERIFY_TOKEN = 'VERIFY_TOKEN';

export const verfiyToken = async () => {
  const response = await MauiApi.post('/verify-token');
  return response.data;
};

const useVerifyToken = () => {
  return useQuery([VERIFY_TOKEN] as QueryKey, verfiyToken);
};
export default useVerifyToken;
