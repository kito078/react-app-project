import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {
        //we wana try this stuff  //start
        const res = await fetch(url, { signal: controller.signal }); //Association the fetch request wth e abort controller
        if (!res.ok) {
          throw new Error(res.status);
        }
        const json = await res.json();

        setIsPending(false);
        setData(json);
        setError(null);
        //end
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
          console.log(err.message);
        }
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);
  //return the values so tt we can use them later in othe components
  return { data, isPending, error };
};

export default useFetch;
