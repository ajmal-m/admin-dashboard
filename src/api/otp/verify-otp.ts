import axiosInstance from "../api";
import { useMutation  } from "@tanstack/react-query";

type Data = {
    email:string;
    otp:string;
};



export const verifyOTP = async(data : Data) => {
    try {
        return await axiosInstance.post('/email/verify-otp',data);
    } catch (error) {
        throw error;
    }
}


export const useVerifyOTP = ({
    onSuccess,
    onError
} : {
    onSuccess: () => void,
    onError : () => void
}) => {
    return useMutation({
        mutationFn: (data : Data ) => {
            return verifyOTP(data);
        },
        onError(error) {
            console.log("❌ OTP verification failed:", error);
            onError();
        },
        async onSuccess(data) {
            console.log("✅ OTP verified:", data);
            onSuccess();
        },
    })
}