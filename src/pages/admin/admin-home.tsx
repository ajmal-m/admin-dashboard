import { useGetAverageOrderValue } from "@/api/analytics/get-avg-order-value";
import { useGetCustomersCount } from "@/api/analytics/get-customers-count";
import { useGetDeliveredOrderCount } from "@/api/analytics/get-delivered-count";
import { useGetLastWeekSales } from "@/api/analytics/get-last-week-sales";
import { formatIndianNumber } from "@/utils/utils";
import {  memo } from "react";


const SalesCard = memo(() => {
    const getSalesMutation = useGetLastWeekSales();

    const data = getSalesMutation?.data?.data?.data;
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Sales at Last Week
            </h1>
            {
                getSalesMutation.isLoading  ? (
                    <div className="h-[34px] bg-green-700 rounded-full w-38 animate-pulse"></div>
                ) : (
                    <p className="text-[24px] text-white font-mont font-medium" >
                       ₹ {
                            formatIndianNumber(data)
                        }
                    </p>
                )
            }
        </div>
    )
});


const DeliveredCard = memo(() => {
    const getDeliveredOrderMutation = useGetDeliveredOrderCount();
    const data = getDeliveredOrderMutation?.data?.data?.data;
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Delivered Orders
            </h1>
             {
                getDeliveredOrderMutation.isLoading  ? (
                    <div className="h-[34px] bg-green-700 rounded-full w-38 animate-pulse"></div>
                ) : (
                    <p className="text-[24px] text-white font-mont font-medium" >
                       {data}
                    </p>
                )
            }
        </div>
    )
});

const TotalCustomerCard = memo(() => {
    const getCutsomerCountMutation = useGetCustomersCount();
    const data = getCutsomerCountMutation?.data?.data?.data;
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Total Customers
            </h1>
             {
                getCutsomerCountMutation.isLoading  ? (
                    <div className="h-[34px] bg-green-700 rounded-full w-38 animate-pulse"></div>
                ) : (
                    <p className="text-[24px] text-white font-mont font-medium" >
                       {data}
                    </p>
                )
            }
        </div>
    )
});

const AverageOrderValueCard = memo(() => {
    const getAverageOrderValMutation = useGetAverageOrderValue();
    const data = getAverageOrderValMutation?.data?.data?.data;
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Average Order Value
            </h1>
             {
                getAverageOrderValMutation.isLoading  ? (
                    <div className="h-[34px] bg-green-700 rounded-full w-38 animate-pulse"></div>
                ) : (
                    <p className="text-[24px] text-white font-mont font-medium" >
                      ₹ {formatIndianNumber(data)}
                    </p>
                )
            }
        </div>
    )
});



const AdminHomePage = memo(() => {
    return(
        <section className="px-10 mt-4 max-[992px]:px-4">
            <div className="grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                <SalesCard/>
                <DeliveredCard/>
                <TotalCustomerCard/>
                <AverageOrderValueCard/>
            </div>
        </section>
    )
});

export default AdminHomePage;