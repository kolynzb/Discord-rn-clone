import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import "react-native-gesture-handler";
import { StreamChat } from "stream-chat";
import { useEffect } from "react";

const API_KEY = "tn5n438ug9v3";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const connectUser = async () => {
    //sign in with backend and get user token

    await client.connectUser(
      {
        id: "vadim",
        name: "Vadim",
        image:
          "https://res.cloudinary.com/kolynz-b/image/upload/v1638636909/ko.lynz_b_218871186_831566384142117_7643572219233961744_n_wcsj3e.jpg",
      },
      client.devToken("vadim")
    );
  };
  useEffect(() => {
    connectUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
