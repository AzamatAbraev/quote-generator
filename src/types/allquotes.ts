import QuoteType from "./quote";

interface QuotesType {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: QuoteType[];
}

export default QuotesType