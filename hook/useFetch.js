import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const options = {
    //this is the options object that we will pass to axios.request(). Based on the api's instructions.
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query }, //axios expects params to have a key value pair obj so query is an object so we need to spread it to get the key value pairs
    //Without spreading the query object, the params object will simply be an object with a single key, which is the query object itself, and that is not what we want.
    //like this:
    /*params: {
      query: {
        term: "apple",
        category: "fruits",
        price: 10,
      },
    },*/
    //instead of
    /*
      params: {
        term: "apple",
        category: "fruits",
        price: 10,
      }
    */
  };

  //axios.request() allows you to define more parameters than axios.get(), such as headers, params, data, timeout, and responseType. It also allows you to use any HTTP method, while axios.get() is limited to the GET method.
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      //   console.log(response.data.data);
      setData(response.data.data);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      //this will run regardless of the result of the try block
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    //this function will be called when we want to refetch the data
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
