export const getCategoryId = (name: string, data?: any[]) => {
  if (!data) return null;
  const category = data?.find(item => item.name === name);
  return category ? category.id : null;
};

export const getCategoryName = (id: string, data?: any[]) => {
  if (!data) return null;
  const category = data?.find(item => item.id === id);
  return category ? category.name : null;
};
