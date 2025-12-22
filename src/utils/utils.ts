import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { memo, useEffect, useState } from "react";

export const isValidEmail = (email : string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const paymentStatusClass: Record<string, string> = {
  PENDING: "bg-blue-800",
  PAID: "bg-green-700",
  FAILED: "bg-red-700",
  REFUNDED: "bg-yellow-700",
};

export const ORDER_STATUS = [
  "PLACED",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "RETURN_REQUESTED",
  "RETURNED",
  "REFUNDED"
];

export const ORDER_STATUS_COLOR: Record<string, string> = {
  PLACED: "bg-gray-500 text-white",
  CONFIRMED: "bg-blue-600 text-white",
  PROCESSING: "bg-indigo-600 text-white",
  SHIPPED: "bg-purple-600 text-white",
  OUT_FOR_DELIVERY: "bg-yellow-500 text-black",
  DELIVERED: "bg-green-600 text-white",
  CANCELLED: "bg-red-600 text-white",
  RETURN_REQUESTED: "bg-orange-500 text-white",
  RETURNED: "bg-pink-600 text-white",
  REFUNDED: "bg-teal-600 text-white",
};



export const PAYMENT_STATUS =  ["PENDING", "PAID", "FAILED", "REFUNDED"];
export const DELIVERY_CHARGE=2;
export const CURRENCY = "INR"




dayjs.extend(relativeTime);

export const timeAgo = (date: string | Date) => {
  return dayjs(date).fromNow();
};


export function formatIndianNumber(value : string | number, decimals = 2) {
  return Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}


export const useDebouncer =  ( str : string , delay = 500 ) => {
  const [ debounceStr, setDebounceStr] = useState<string>(str);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceStr(str);
    },delay);

    return () => clearTimeout(timer);
  },[str , delay]);

  return debounceStr;
}