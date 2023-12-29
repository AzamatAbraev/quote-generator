import { create } from "zustand";
import request from "../server/request";
import QuoteType from "../types/quote";

interface AllQuotesType {
  loading: boolean;
  allquotes: QuoteType[];
  searchQuotes: QuoteType[];
  total: number;
  searchTotal: number;
  getAllQuotes: (page: number, tags: string, author: string) => void;
  searchAllQuotes: (search: string) => void;
}

const useAllQuotes = create<AllQuotesType>((set) => ({
  loading: false,
  allquotes: [],
  searchQuotes: [],
  total: 1,
  searchTotal: 1,
  getAllQuotes: async (page, tags, author) => {
    try {
      const params = {
        page,
        tags,
        author,
      };
      set({ loading: true });
      const { data } = await request("quotes", { params });
      set({ total: data?.totalCount });
      set({ allquotes: data?.results });
    } finally {
      set({ loading: false });
    }
  },
  searchAllQuotes: async (search) => {
    const params = {
      query: search,
    }
    const {data} = await request("search/quotes", {params})
    set({searchQuotes: data?.results})
    set({searchTotal: data?.totalCount});
  }
}));

export default useAllQuotes;
