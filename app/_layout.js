import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"; //to hide the splash screen when the app is launched

//splash screen is the first screen that appears before the user accesses the rest of your app’s functionalities. It is a temporary screen that provides feedback to the user that the app is loading and not frozen.
SplashScreen.preventAutoHideAsync(); //prevents the splash screen from hiding automatically

export default function Layout() {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  //similar to useEffect() but with useCallback() when a function is called with a set of inputs, it can store the results of that computation in a cache.
  //If the function is called again with the same inputs, it can simply return the cached result instead of recomputing the result. This can save time and resources because the function doesn't need to be executed again for the same input.
  const onLayoutRootView = useCallback(async () => {
    //useCallback is used to prevent the function from being recreated on every render
    if (fontsLoaded) {
      //if the fonts are loaded, hide the splash screen
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack onLayout={onLayoutRootView} />;
  //By passing onLayoutRootView as the callback function for the onLayout prop, it ensures that this function is called when the layout of the Stack component changes, 
  //which can happen when the component is mounted or updated. This can be useful for triggering actions that need to be performed when the layout changes, such as hiding the splash screen.
}
