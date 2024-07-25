import React from "react";
import video from "../videos/herbs.mp4";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { GoEyeClosed } from "react-icons/go";
import { BsEye } from "react-icons/bs";
import { AuthContextProvider } from "../contexts/AuthContext";
import LoadingPage from "../components/LoadingPage";

const Login = () => {
  const authContext = React.useContext(AuthContextProvider);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loading = authContext.loading;

  return (
    <div
      dir="rtl"
      className="cairo h-[100vh] flex flex-col justify-center items-center"
    >
      {loading ? <LoadingPage /> : null}
      <div className="flex md:flex-row flex-col w-full h-full">
        <div className="md:w-1/2 h-full bg-emerald-300 overflow-hidden relative">
          <video src={video} className="w-[400vw]" autoPlay loop muted></video>
          <div className="absolute md:block hidden from-black/90 via-zinc-950/40 to-black/60 bg-gradient-to-t opacity-50 z-30 top-0 left-0 w-full h-full"></div>
        </div>
        <div className="md:w-1/2 gap-5 p-2 from-slate-200 to-transparent bg-gradient-to-t h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-indigo-800">
            تسجيل الدخـــول
          </h1>
          <div className="flex w-full flex-col gap-4">
            <Input
              bgColor={"white"}
              placeholder="البريد الإلكتروني او اسم الحساب"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup size="md">
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <GoEyeClosed /> : <BsEye />}
                </Button>
              </InputRightElement>
              <Input
                bgColor={"white"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
            </InputGroup>
            <Button
              onClick={() => authContext?.signIn({ email, password })}
              className="w-fit"
              colorScheme="green"
            >
              تسجيل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
