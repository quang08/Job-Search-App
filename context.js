import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const useFetch = (endpoint, query) => {
    const options = {
      //this is the options object that we will pass to axios.request(). Based on the api's instructions.
      method: "GET",
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      headers: {
        "X-RapidAPI-Key": "711fd2a9d6msh9826c77636a638fp10ade0jsne810293c6c6a",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
      params: { ...query }, //query is an object so we need to spread it to get the key value pairs
      //Without spreading the query object, the params object will simply be an object with a single key, which is the query object itself, and that is not what we want.
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

  };

  const refetch = (endpoint, query) => {
    //this function will be called when we want to refetch the data
    setIsLoading(true);
    useFetch(endpoint, query);
  };

  return (
    <AppContext.Provider
      value={{ isLoading, error, data, setData, setIsLoading, setError, useFetch, refetch }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Create a custom hook to consume the API context
export function useApi(endpoint, query) {
  return useContext(AppContext);
}

export default AppContext;
