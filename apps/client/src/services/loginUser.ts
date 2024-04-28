import axios from 'axios';

export const loginUser = async (user: any): Promise<void> => {
  console.log({ post: user });
  const { data } = await axios.post('/gardens', user);

  // return userGardenMapper(data);
};
