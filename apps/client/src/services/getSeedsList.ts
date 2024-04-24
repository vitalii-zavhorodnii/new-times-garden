import axios from 'axios';

export const getSeedsList = async () => {
    const { data } = await axios.get('/seeds');

    return data;
};
