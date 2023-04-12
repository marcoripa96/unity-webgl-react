import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Unity, useUnityContext } from "react-unity-webgl";

const Home: NextPage = () => {
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
    requestFullscreen,
    takeScreenshot,
    unload,
  } = useUnityContext({
    loaderUrl: "/unitybuild/crateclicker.loader.js",
    dataUrl: "/unitybuild/crateclicker.data",
    frameworkUrl: "/unitybuild/crateclicker.framework.js",
    codeUrl: "/unitybuild/crateclicker.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const startGame = (time: number) => {
    if (isLoaded === false) {
      return;
    }
    sendMessage("GameController", "StartGame", time);
  };

  const handleClickFullscreen = () => {
    if (isLoaded === false) {
      return;
    }
    requestFullscreen(true);
  };

  return (
    <>
      <Unity
        unityProvider={unityProvider}
        style={{
          display: isLoaded ? "block" : "none",
          width: 600,
          height: 400,
        }}
      />
      <div className="flex flex-col items-start">
        <button onClick={handleClickFullscreen}>Fullscreen</button>
        <button onClick={() => startGame(5)}>Start</button>
      </div>
    </>
  );
};

export default Home;
