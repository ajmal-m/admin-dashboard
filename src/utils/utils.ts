export const isValidEmail = (email : string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const DELIVERY_CHARGE=2;
export const CURRENCY = "INR"