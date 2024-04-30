import axios from 'axios';

interface ICreatePaymentProps {
  productId: string;
  userId: string;
}

export const createUser = async (
  paymentData: ICreatePaymentProps
): Promise<void> => {
  const { data } = await axios.post('/users', paymentData);

  return data;
};
