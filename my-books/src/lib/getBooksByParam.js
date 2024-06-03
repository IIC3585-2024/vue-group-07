import axios from "axios";
import bookHasMinAttrs from "./bookHasMinAtrrs";

export default async function getBooksByParam(text, param, page=1, limit=10) {
  const formattedText = text.replace(" ", "+").toLowerCase();
  let response;
  try {
    if (param === 'title') {
      response = await axios.get(`http://openlibrary.org/search.json?title=${formattedText}&page=${page}&limit=${limit}`);
    } else if (param === 'author') {
      response = await axios.get(`http://openlibrary.org/search.json?author=${formattedText}&page=${page}&limit=${limit}`);
    } else {
        response = await axios.get(`http://openlibrary.org/search.json?q=${formattedText}&page=${page}&limit=${limit}`);
    }

    const data = response.data.docs;
    const books = data.filter(book => bookHasMinAttrs(book));
    return books;

  } catch (error) {
    console.error(error);
  }
}