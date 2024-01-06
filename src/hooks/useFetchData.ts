import { useEffect, useState } from "react";
import request from "../server/request";

function useFetchData(url: string) {
  const [state, setState] = useState([]);

  useEffect(() => {
    const abortController: AbortController = new AbortController();

    const getData = async () => {
      const { data } = await request(url, { signal: abortController.signal });
      setState(data);
    };
    getData();

    return () => {
      abortController.abort()
    }
  }, [url]);

  return state;
}

export default useFetchData;
