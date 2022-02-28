import axios from 'axios';

export const addIncome = income => {
  return axios.post('http://localhost:5000/income', income);
};
