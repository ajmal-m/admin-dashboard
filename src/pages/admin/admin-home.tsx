import {  memo } from "react";


const SalesCard = memo(() => {
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Sales at Last Week
            </h1>
            <p className="text-[24px] text-white font-mont font-medium" >
                $15,230
            </p>
        </div>
    )
});


const DeliveredCard = memo(() => {
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Delivered Orders
            </h1>
            <p className="text-[24px] text-white font-mont font-medium" >
                $15,230
            </p>
        </div>
    )
});

const TotalCustomerCard = memo(() => {
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Total Customers
            </h1>
            <p className="text-[24px] text-white font-mont font-medium" >
                $15,230
            </p>
        </div>
    )
});

const AverageOrderValueCard = memo(() => {
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">
                Average Order Value
            </h1>
            <p className="text-[24px] text-white font-mont font-medium" >
                $15,230
            </p>
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