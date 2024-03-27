import MauiApi from '../../clientProvider/axiosConfig';

interface Props {
  email: string;
  name: string;
  cellphone: string;
  countryCode: string;
  language: string;
  country: string;
  photo: string;
}

export const googleSignUp = async (data: Props) => {
  const response = await MauiApi.post('/googleSignUp', data);
  return response.data;
};
