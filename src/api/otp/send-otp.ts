import axiosInstance from "../api";
import { useMutation  } from "@tanstack/react-query";

type Data = {
    email:string;
};



export const sendOtpToEmail = async(data : Data) => {
    try {
        return await axiosInstance.post('/email/send-otp',data);
    } catch (error) {
        throw error;
    }
}


export const useSendOTPtoEmail = ({
    onSuccess
}: { onSuccess : () => void}) => {
    return useMutation({
        mutationFn: (data : Data ) => {
            return sendOtpToEmail(data);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess(data) {
            onSuccess();
        },
    })
}