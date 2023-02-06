/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const createBookmark = async (
  title,
  description,
  content,
  url,
  image,
  publishedAt,
  sourceName,
  sourceURL
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
        publishedAt,
        sourceName,
        sourceURL,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Bookmark Saved!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
