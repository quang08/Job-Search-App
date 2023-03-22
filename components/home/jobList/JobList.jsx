import React from "react";
import useFetch from "../../../hook/useFetch";
import Nearbyjobs from "../nearby/Nearbyjobs";
import Popularjobs from "../popular/Popularjobs";

const JobList = () => {
  // const { isLoading, error, data } = useFetch("search", {
  //   query: "React Native Developer",
  //   num_pages: "1",
  // });

  return (
    <>
      <Popularjobs />
      <Nearbyjobs />
    </>
  );
};

export default JobList;


//<Popularjobs data={data} isLoading={isLoading} error={error} />
//<Nearbyjobs data={data} isLoading={isLoading} error={error} /> 