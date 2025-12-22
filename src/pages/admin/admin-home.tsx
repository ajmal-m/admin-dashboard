import { useGetAverageOrderValue } from "@/api/analytics/get-avg-order-value";
import { useGetCustomersCount } from "@/api/analytics/get-customers-count";
import { useGetDeliveredOrderCount } from "@/api/analytics/get-delivered-count";
import { useGetLastSevenDaysSales } from "@/api/analytics/get-last-seven-days-sales";
import { useGetLastWeekSales } from "@/api/analytics/get-last-week-sales";
import { useGetOrderStatusData } from "@/api/analytics/get-order-status-data";
import { useGetTopCategories } from "@/api/analytics/get-top-categories";
import { useGetTopProducts } from "@/api/analytics/get-top-products";
import BarsDataset from "@/components/admin/analytics/bar-chart";
import PieActiveArc from "@/components/admin/analytics/pie-chart";
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

const OrderStatusPieChart = memo(() => {
    const getOrderStatusDataMutation = useGetOrderStatusData();
    const data = getOrderStatusDataMutation?.data?.data?.data;
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Order Status
            </h1>
            <PieActiveArc 
                data={
                    getOrderStatusDataMutation.isLoading ? 
                    [{ label:'Loading..' , value:50}] : data
                }
            />
        </div>
    )
});


const TopProductBarChart = memo(() => {
    const getTopProductMutation = useGetTopProducts();

    const data = getTopProductMutation?.data?.data?.data;
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Top Demanded 10 Products
            </h1>
            <BarsDataset 
                data={
                    data
                }
                xKey="name"
                yKey="value"
                label="Quantity"
                loading={getTopProductMutation.isLoading}
                valueFormatter={(x) => `${x} Kg`}
            />
        </div>
    )
});


const LastWeekSales = memo(() => {
    const getLastSevenDaysSalesMutation = useGetLastSevenDaysSales();
    const data = getLastSevenDaysSalesMutation?.data?.data?.data || [];
    return(
         <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Last Week Sales
            </h1>
            <BarsDataset 
                data={
                    data
                }
                xKey="date"
                yKey="sale"
                label="sales"
                loading={getLastSevenDaysSalesMutation.isLoading}
                valueFormatter={(x) => `Rs.${x}`}
            />
        </div>
    )
});

const TopCategoriesByQuantitySold = memo(() => {
    const getTopCategoryMutation = useGetTopCategories();

    const data = getTopCategoryMutation?.data?.data?.data;
    return(
          <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Top Categories By Sold
            </h1>
            <BarsDataset 
                data={
                    data
                }
                xKey="name"
                yKey="quantity"
                label="Quantities"
                loading={getTopCategoryMutation.isLoading}
                valueFormatter={(x) => `${x} Kg`}
            />
        </div>
    )
})




const AdminHomePage = memo(() => {
    return(
        <section className="px-10 mt-4 max-[992px]:px-4">
            <div className="grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                <SalesCard/>
                <DeliveredCard/>
                <TotalCustomerCard/>
                <AverageOrderValueCard/>
            </div>
            <div className="grid  grid-cols-[repeat(auto-fit,minmax(410px,1fr))] gap-4 mt-4">
                <OrderStatusPieChart/>
                <TopProductBarChart/>
            </div>
            <div className="grid  grid-cols-[repeat(auto-fit,minmax(410px,1fr))] gap-4 mt-4">
                <LastWeekSales/>
                 <TopCategoriesByQuantitySold/>
            </div>
        </section>
    )
});

export default AdminHomePage;