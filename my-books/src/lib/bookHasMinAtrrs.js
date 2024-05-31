export default function bookHasMinAttrs(book) {
  const hasDetails = 'title' in book && 'author_name' in book 
    && 'first_publish_year' in book && 'cover_i' in book && 'key' in book;
  const hasMetrics = 'ratings_average' in book && 'ratings_count' in book && 'number_of_pages_median' in book;
  return hasDetails && hasMetrics;
}