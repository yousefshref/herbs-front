import { Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-full bg-yellow-300/40 rounded-xl fixed bottom-0 left-0 z-10">
      <Spinner size="xl" />
    </div>
  );
};

export default LoadingScreen;
