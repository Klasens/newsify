/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const createBookmark = async (
  title,
  description,
  content,
  url,
  image
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/bookmarks',
      data: {
        title,
        description,
        content,
        url,
        image,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Bookmark Saved!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
