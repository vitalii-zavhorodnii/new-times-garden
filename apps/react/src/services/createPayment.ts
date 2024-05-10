import axios from 'axios';

interface ICreatePaymentProps {
  productId: string,
  userId: string,
  boc: string,
}

export const createPayment = async (
  paymentData: ICreatePaymentProps
): Promise<void> => {
  const { data } = await axios.post('/payments', paymentData);

  return data;
};
