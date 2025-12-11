import axiosInstance from "../api";
import { useMutation  } from "@tanstack/react-query";
import { AxiosError} from 'axios';

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
    onSuccess,
    onError
}: { onSuccess : () => void ; onError : (msg : string ) => void}) => {
    return useMutation({
        mutationFn: (data : Data ) => {
            return sendOtpToEmail(data);
        },
        onError(error : AxiosError<{ message: string }>) {
            console.log(error);
            onError(error?.response?.data?.message ?? "Error while create try again");
        },
        async onSuccess(data) {
            onSuccess();
        },
    })
}