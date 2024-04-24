import { Platform } from 'react-native';
import MauiApi from '../../clientProvider';
import { QueryKey, useQuery } from 'react-query';
import { version as AppVersion } from '../../../../package.json';

const version = Platform.select({
  android: AppVersion,
  ios: AppVersion,
});

export const VERSION_MANAGER = 'VERSION_MANAGER';

export const validateAppVersion = async () => {
  const response = await MauiApi.get(`/validate-version?version=${version}`);
  return response.data;
};

const useVersion = () => {
  return useQuery([VERSION_MANAGER] as QueryKey, validateAppVersion);
};
export default useVersion;
