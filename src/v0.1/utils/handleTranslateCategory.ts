import i18n from '../services/i18n-config';
const KEY_PATH = 'balance_stack.categories';

export const handleTranslateCategory = (name: string, data: Dictionary[]) => {
  if (name) {
    const res = data.find(item => item.nombre === name)?.key;
    return i18n.t(`${KEY_PATH}.${res}`);
  }
  return '';
};
