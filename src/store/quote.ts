import { create } from "zustand";
import QuoteType from "./../types/quote";
import request from "../server/request";

interface LatestType {
  loading: boolean;
  quote: QuoteType[];
  getQuote: () => void;
}

const useQuote = create<LatestType>()((set) => ({
  loading: false,
  quote: [],

  getQuote: async () => {
    try {
      const params = {
        maxLength: 50,
      }
      set({ loading: true });
      const { data } = await request("quotes/random", {params});
      set({ quote: data });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useQuote;
