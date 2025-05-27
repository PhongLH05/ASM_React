import { useEffect, useState } from "react";
import HomeScreen from "./Screen/HomeScreen";
import SplashScreen from "./Screen/SplashScreen";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  });

  return <>{isShowSplash ? <SplashScreen /> : <HomeScreen />}</>;
}
