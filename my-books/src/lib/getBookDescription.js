import axios from 'axios';

export default async function getBookDescription(bookKey) {
  try {
    const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
    return response.data.description || "No description available";
  } catch (error) {
    console.error(error);
  }
}