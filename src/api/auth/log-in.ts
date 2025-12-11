import axiosInstance from "../api";
import { useMutation  } from "@tanstack/react-query";
import { updateEmail , updateAuth, updateToken } from "@/redux/features/auth";
import {AxiosError} from 'axios';

type AuthData = {
    email: string;
    password: string;
};



export const logIn = async(data : AuthData ) => {
    try {
        return await axiosInstance.post('/auth/log-in',data);
    } catch (error) {
        throw error;
    }
}


export const useAuthLogIn = ( { onSuccess , onError}: {
    onSuccess: () => void,
    onError: (message: string) => void
}) => {
    return useMutation({
        mutationFn: (data : AuthData ) => {
            return logIn(data);
        },
        onError(error : AxiosError<{ message?:string }>) {
            onError(error?.response?.data?.message??"")
            updateAuth({ isAuthenticated : false});
        },
        async onSuccess(data) {
            onSuccess();
            updateAuth({ isAuthenticated : true});
            updateEmail({ email : data.data?.email ?? ""});
            updateToken({ token : data.data?.email })
        },
    })
}