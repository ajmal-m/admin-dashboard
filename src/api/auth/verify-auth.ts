import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const verifyAuthentication = async()=> {
    return axiosInstance.get("/auth/verify-auth");
}



export const verifyUserAuthenticationOption = () => {
    return queryOptions({
        queryKey:['verify-auth'],
        queryFn: () => verifyAuthentication()
    })
}


export const useVerifyUserAuth = ( {
    queryConfig 
} : { queryConfig ?: any} ) => {
    return useQuery({
       ...verifyUserAuthenticationOption(),
       ...queryConfig
    })
}