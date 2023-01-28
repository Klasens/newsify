import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log('test for update data');
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} has been updated!`);
    }
  } catch (err) {
    console.log(err);
    showAlert('fail', err.response.data.message.errors.email.message);
  }
};
