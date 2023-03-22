import { View, SafeAreaView, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";

import { SIZES, COLORS, icons, images } from "../constants";

import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import JobList from "../components/home/jobList/JobList";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    //Stack.Screen is used to render the screen and its options are used to customize the header
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen //header
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" /> //iconUrl and dimensions passed as props to ScreenHeaderBtn
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) router.push( `/search/${searchTerm}`)
            }}
          />
          <JobList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
