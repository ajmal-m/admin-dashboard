import axiosInstance from "../api";
import { useMutation  } from "@tanstack/react-query";
import {  updateState } from "@/redux/features/auth";
import {AxiosError} from 'axios';

type AuthData = {
    email: string;
    password: string;
};



export const signUp = async(data : AuthData ) => {
    try {
        return await axiosInstance.post('/auth/sign-up',data);
    } catch (error) {
        throw error;
    }
}


export const useAuthSignUp = ( { onSuccess , onError}: {
    onSuccess: () => void,
    onError: (message: string) => void
}) => {
    return useMutation({
        mutationFn: (data : AuthData ) => {
            return signUp(data);
        },
        onError(error : AxiosError<{ message?:string }>) {
            onError(error?.response?.data?.message??"")
            updateState({ isAuthenticated : false});
        },
        async onSuccess(data) {
            onSuccess();
            updateState({ isAuthenticated : true , email : data?.data?.email ?? '' , token: data?.data?.token ?? ''});
        },
    })
}