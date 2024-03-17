import MauiApi from '../../clientProvider/axiosConfig';

interface Props {
  email: string;
  authSource: string;
  name: string;
  photo: string;
}

export const googleLogin = async (data: Props) => {
  const response = await MauiApi.post('/googleLogin', data);
  return response.data;
};
