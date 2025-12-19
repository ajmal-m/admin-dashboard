export const isValidEmail = (email : string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const paymentStatusClass: Record<string, string> = {
  PENDING: "bg-blue-800",
  SUCCESS: "bg-green-700",
  FAILED: "bg-red-700",
  REFUNDED: "bg-yellow-700",
};

export const DELIVERY_CHARGE=2;
export const CURRENCY = "INR"