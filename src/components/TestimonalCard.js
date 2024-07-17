import { Button } from "@chakra-ui/react";
import React from "react";
import { BsInstagram, BsQuote } from "react-icons/bs";

const TestimonalCard = () => {
  return (
    <div className="flex z-20 flex-col gap-3 md:w-1/3 w-full bg-white rounded-xl overflow-hidden">
      <div className="flex gap-3 justify-between items-center pb-3">
        <span>
          <img
            className="w-full rounded-e-full rounded-b-full max-w-[100px]"
            src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </span>
        <div className="flex text-sm items-center gap-3 p-2">
          <span>
            <BsInstagram />
          </span>
          <h6 className="font-bold text-zinc-800">اسم العميل</h6>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <span className="text-3xl font-bold text-zinc-800">
          <BsQuote />
        </span>
        <p className="text-zinc-800 font-medium">
          شويه الكلام اللي هو قالو وكدة وده شوية كلام عشوائي مش عارف اقول ايه بس
          عايز ازود الكلام شويتين وكدة يعني
        </p>
      </div>
      <hr />
      <div className="flex gap-4 p-3 justify-center">
        <Button colorScheme="teal">تفاصيل المنشور</Button>
        <Button colorScheme="green">العميل</Button>
      </div>
    </div>
  );
};

export default TestimonalCard;
