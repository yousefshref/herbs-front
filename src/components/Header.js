import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";

const Header = () => {
  const authContext = React.useContext(AuthContextProvider);

  const user = authContext.user;

  useEffect(() => {
    authContext.getUser();
  }, []);

  return (
    <header className="absolute z-50 md:text-base text-xs top-0 right-0 flex gap-5 justify-between w-full items-center p-3">
      <div className="flex items-center md:gap-20 gap-5">
        <img className="w-[50px]" src="/logos/humming-bird.png" />
        <div className="flex items-center gap-3">
          <p>منتجات التخسيس</p>
          <p>الرياضيين</p>
          <p>منتجات العسل</p>
          <p>البشرة والصحة</p>
        </div>
      </div>
      <div className="px-3">
        {user?.id ? (
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              className="md:text-base text-xs"
              colorScheme="green"
              size="sm"
            >
              <Link to="/products">المتجر</Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              className="md:text-base text-xs"
              colorScheme="green"
              size="sm"
            >
              <Link to="/products">المتجر</Link>
            </Button>
            <Button
              variant="outline"
              className="md:text-base text-xs"
              colorScheme="yellow"
              size="sm"
            >
              <Link to="/authentication/login/">تسجيل الدخول</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
