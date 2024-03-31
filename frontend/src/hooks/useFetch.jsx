import { useState, useEffect } from "react";

export const useFetch = (url, ref, initialValue, options = {}) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ref.current) {
      (async () => {
        try {
          let res;
          if (Object.keys(options).length != 0) {
            res = await fetch(url, options);
          } else {
            res = await fetch(url);
          }
          const data = await res.json();
          setData(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      })();
    }
    return () => {
      ref.current = false;
    };
  }, [url, ref, options]);
  return { loading, data, error };
};
