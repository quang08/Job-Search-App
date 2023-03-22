import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

import { COLORS } from "../../../constants";

import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

import styles from "./nearbyjobs.style";

const Nearbyjobs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key":
            "",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: "React Native Developer",
          num_pages: "1",
        },
      };

      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFetch();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job, i) => (
            <NearbyJobCard
              job={job}
              // key={job.job_id}
              key={i}
              handleCardPress={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
