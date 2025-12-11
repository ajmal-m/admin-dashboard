import axiosInstance from "../api";
import { useMutation  } from "@tanstack/react-query";
import {   updateState } from "@/redux/features/auth";
import {AxiosError} from 'axios';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";

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
    onSuccess: ( token: string) => void,
    onError: (message: string) => void
}) => {
    const dispatch = useDispatch<AppDispatch>();
    return useMutation({
        mutationFn: (data : AuthData ) => {
            return logIn(data);
        },
        onError(error : AxiosError<{ message?:string }>) {
            onError(error?.response?.data?.message??"");
            dispatch(updateState({ isAuthenticated : false}));
        },
        async onSuccess(data) {
            onSuccess(data?.data?.token ?? '');
            dispatch(updateState({ isAuthenticated : true , email: data.data?.email ?? '', token: data.data?.token??''  , id : data.data?.id ?? ''}))
            console.log("STate are updates.")
        },
    })
}