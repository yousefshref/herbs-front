import { Button } from "@chakra-ui/react";
import React from "react";
import { BiPlay, BiStore, BiVideo } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsInstagram, BsQuote } from "react-icons/bs";
import TestimonalCard from "../components/TestimonalCard";
import { Navigation, Pagination } from "swiper/modules";

const Home = () => {
  const logos = [
    {
      src: "/logos/logo1.png",
      alt: "addidas",
    },
    {
      src: "/logos/logo2.png",
      alt: "Test",
    },
    {
      src: "/logos/logo3.png",
      alt: "nike",
    },
  ];
  return (
    <div dir="rtl" className="flex flex-col cairo">
      <div className="landing flex flex-col justify-center items-center relative w-[100vw] overflow-hidden from-slate-100 to-transparent bg-gradient-to-t h-[100vh]">
        <header className="absolute md:text-base text-xs top-0 right-0 flex md:gap-20 gap-5 justify-start items-center p-3">
          <img className="w-[50px]" src="/logos/humming-bird.png" />
          <div className="flex items-center gap-3">
            <p>منتجات التخسيس</p>
            <p>الرياضيين</p>
            <p>منتجات العسل</p>
            <p>البشرة والصحة</p>
          </div>
        </header>
        <div className="flex relative items-center justify-between w-full h-full">
          <div className="absolute md:hidden block from-white via-white to-transparent bg-gradient-to-t opacity-50 z-30 top-0 left-0 w-full h-full"></div>
          <div className="md:w-1/2 w-full pt-10 h-full">
            <div className="from-indigo-700/30 relative to-transparent bg-gradient-to-t h-full p-2 flex flex-col justify-center items-center">
              <img
                className="md:w-full w-[50vw] absolute md:-me-[15vw] -me-[40vw] md:-mt-[0vw] -mt-[40vw] transition-all duration-1000 md:dropeed-shadow"
                src="/products/HHS.png"
              />
              <img
                className="md:w-[calc(100%-25vw)] md:mt-[21vw] mt-[70vw] me-[50vw] md:me-[17vw] absolute transition-all duration-1000 md:dropeed-shadow"
                src="/products/argivit.png"
              />
            </div>
          </div>
          <div className="md:w-1/2 md:relative w-full top-0 left-0 absolute z-40 h-full gap-5 p-3 flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5">
              <h2 className="text-6xl font-bold -ms-[8vw]">اسم المتجر</h2>
              <p className="">
                ابحث عن ماتريد{" "}
                <mark className="bg-yellow-400 px-3">بـسهــــولـــــة</mark>{" "}
                وبدون تردد.
              </p>
            </div>
            <Button
              className="-ms-20"
              leftIcon={<BiPlay />}
              colorScheme="purple"
            >
              فديو تعريفي
            </Button>
          </div>
        </div>
      </div>

      <div className="flex md:mb-0 mb-20 items-center h-[30vw] gap-5">
        <div className="md:flex hidden flex-col justify-center h-full -mt-[3vw] z-10 md:w-[40%] w-0 from-black/90 via-zinc-950 to-black/85 bg-gradient-to-t p-3"></div>
        <div className="relative justify-center flex flex-col gap-1 md:w-[60%] w-full h-full">
          <div className="flex z-20 my-auto md:items-start items-center md:mt-0 mt-32 flex-col gap-5">
            <h1 className="md:text-5xl text-xl font-bold text-zinc-500 md:-ms-[3vw]">
              لديك الكثير من الإختيارات
            </h1>
            <Button
              leftIcon={<BiStore />}
              colorScheme="green"
              className="w-fit"
            >
              تصفح المتجر
            </Button>
          </div>
          {/* add logos scrolling swiper */}
          <div className="flex items-center md:mt-2 mt-3 mb-10 gap-10 justify-center">
            {logos.map((logo, index) => (
              <img
                className="max-w-[30px] w-full"
                src={logo.src}
                alt={logo.alt}
              />
            ))}
            {logos.map((logo, index) => (
              <img
                className="max-w-[30px] w-full"
                src={logo.src}
                alt={logo.alt}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex md:flex-row flex-col p-4 items-center justify-between">
        <div className="absolute md:bg-sky-900 bg-sky-900/50 bg-gradient-to-t opacity-50 z-30 md:top-[12vw] top-[20vw] left-0 w-full h-[10px]"></div>
        <div className="flex z-30 flex-col md:gap-3 md:w-fit w-full">
          <h1 className="md:text-5xl text-lg font-bold text-zinc-500">
            المنتجات التي تبحث عنها
          </h1>
          <p className="md:text-end md:mt-2 md:text-base text-sm">
            - جميعهم قي مكان واحد بسعر مناسب للجميع
          </p>
        </div>
        <div className="relative z-30 flex flex-col md:w-1/2 w-full items-center p-3 justify-center">
          <div className="absolute w-[30%] h-full from-yellow-400/70 to-transparent bg-gradient-to-t"></div>
          <span className="md:w-[60%] z-20">
            <img src="/products/othamni.png" className="w-full" />
          </span>
          <div className="flex z-20 flex-col gap-3">
            <h2 className="text-3xl font-bold text-zinc-800 -ms-[5vw]">
              السر العثماني
            </h2>
          </div>
        </div>
      </div>

      <div className="relative justify-between overflow-hidden flex flex-col z-10 py-10 from-transparent to-black/90 bg-gradient-to-b gap-4 p-5">
        <img
          className="absolute top-0 left-0 mix-blend-screen opacity-10 w-full"
          src="https://img.freepik.com/free-vector/night-sky-with-stars_1048-7871.jpg?w=740&t=st=1721218673~exp=1721219273~hmac=b9ab8faeb7fe1e887f40a22c6d24dd3a99211814264ab082363c67409dba83f4"
        />
        <strong>اراء العملاء</strong>
        <div className="md:flex md:flex-row hidden flex-col gap-4">
          <TestimonalCard />
          <TestimonalCard />
          <TestimonalCard />
        </div>
        <div className="md:hidden block">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            <SwiperSlide>
              <TestimonalCard />
            </SwiperSlide>
            <SwiperSlide>
              <TestimonalCard />
            </SwiperSlide>
            <SwiperSlide>
              <TestimonalCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <footer className="py-8 relative overflow-hidden">
        <div className="absolute p-52 opacity-30 -right-[10vw] -top-[20vw] z-0 bg-yellow-400/50 blur-3xl w-fit"></div>
        <div className="absolute p-40 opacity-100 -left-[10vw] -bottom-[10vw] z-0 bg-red-100/70 blur-3xl w-fit"></div>
        <div className="container z-20 mx-auto flex flex-wrap">
          {/* Left Column */}
          <div className="z-20 w-1/3 px-4 mb-8 md:mb-0">
            <img className="w-[50px]" src="/logos/humming-bird.png" />
            <div className=" z-20">
              <h2 className="font-bold mb-2">تصفح</h2>
              <ul>
                <li className="mb-1">
                  <a href="#" className="text-gray-400">
                    الرئيسية
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-gray-400">
                    المتجر الالكتروني
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-gray-400">
                    المدونة الخاصة بنا
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="z-20 w-1/3 px-4 mb-8 md:mb-0">
            <h2 className="font-bold mb-2">الاقسام</h2>
            <ul>
              <li className="mb-1">
                <a href="#" className="text-gray-400">
                  جميع انواع العسل
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-gray-400">
                  الرياضيين
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-gray-400">
                  البشرة والشعر
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-gray-400">
                  منتجات الاطفال
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="z-20 w-1/3 px-4">
            <h2 className="font-bold mb-2">تابعنا</h2>
            <ul>
              <li className="mb-1">
                <a href="#" className="text-gray-400">
                  Facebook
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-gray-400">
                  Twitter
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-gray-400">
                  Instagram
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-gray-400">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
