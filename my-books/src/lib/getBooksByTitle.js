import axios from "axios";
import bookHasMinAttrs from "./bookHasMinAtrrs";

export default async function getBooksByTitle(title, page=1, limit=10) {
  const formattedTitle = title.replace(" ", "+").toLowerCase();
  try {
    const response = await axios.get(`http://openlibrary.org/search.json?title=${formattedTitle}&page=${page}&limit=${limit}`);
    const data = response.data.docs;
    const books = data.filter(book => bookHasMinAttrs(book));
    return books;
  } catch (error) {
    console.error(error);
  }
}