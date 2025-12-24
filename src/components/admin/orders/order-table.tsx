import React, { memo, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Bars } from "react-loader-spinner";
import type { Order } from "@/type/type";
import { Button } from "@/components/ui/button";
import { useGetAllOrders } from "@/api/order/get-all-orders";
import PopUp from '../../../components/pop-up-drawer';
import OrderUpdateStatusModal from "./order-status-update";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import { closeOrderStatusUpdatePopUp, openOrderStatusUpdatePopUp } from "@/redux/features/popup";
import { ORDER_STATUS_COLOR, paymentStatusClass, timeAgo } from "@/utils/utils";
import { DeleteOrderModal } from "./delete-order-modal";
import { Badge } from "@/components/ui/badge";
import FullCoverPoup from "@/components/full-covered-popup";
import OrderDetailPopup from "./order-detail-popup";
import Pagination from "../pagination";
import { nextPage, prevPage, updatePage } from "@/redux/features/admin/order-table-filters";

const rows = [
    "Name",
    "Mobile",
    "Total",
    "Status",
    "Location",
    "Payment status",
    "Created At",
    "Updated At",
    "Action",
];




const TableHead = memo((
) => {
  return(
    <thead className="bg-neutral-secondary-soft border-b border-default">
      <tr>
        {
            rows.map((rowItem ) => (
                  <th scope="col" 
                  className={cn("px-6 py-3 font-medium font-mont text-[16px]" ) }
                  key={rowItem}
                  >{rowItem}</th>
            ))
        }
      </tr>
    </thead>
  )
});


const TableRow = memo(({ order , index , selectOrder , openDeleteModal , openMoreInfoModal}: 
  { order : Order ; index: number ; selectOrder : () => void;openDeleteModal:( ) => void ; openMoreInfoModal : () => void} 
) => {
  const dispatch = useDispatch<AppDispatch>();

  const updateOrder = useCallback(() => {
    selectOrder(); 
    dispatch(openOrderStatusUpdatePopUp());
  },[selectOrder]);

  const deleteOrder = useCallback(() => {
    selectOrder();
    openDeleteModal();
  },[selectOrder, openDeleteModal]);


  const moreInfoOrder = useCallback(() => {
    selectOrder();
    openMoreInfoModal();
  },[selectOrder, openMoreInfoModal])

  
  return(
    <tr
      key={order._id}
      className={`border-b border-default font-mont ${
        index % 2 === 0 ? 'bg-light dark:bg-bluedark' : 'bg-[#0B6434] text-white'
      }`}

    >
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {order.shippingAddress.name}
      </th>
        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        { String(order.shippingAddress.mobile)}
      </th>
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        Rs. {order.payment.paidAmount}
      </th>
        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap capitalize">
        <Badge className={cn(ORDER_STATUS_COLOR[order.orderStatus as string])}>{order.orderStatus}</Badge>
      </th>
      <td className="px-6 py-4">
        {order.shippingAddress.city}
        <br />
        {order.shippingAddress.state }
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap capitalize">
        <Badge className={cn(paymentStatusClass[order.payment.status as string])}>{order.payment.status}</Badge>
      </th>
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {timeAgo(order?.createdAt ?? "")}
      </th>
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {timeAgo(order?.updatedAt ?? "")}
      </th>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* <EditProduct product={product} evenRow={index % 2 === 0}/> */}
           <Button 
            className={
              cn("cursor-pointer bg-transparent hover:bg-transparent", 
                index%2===1 ? "text-white" :"text-black dark:text-white"  ,
                "border border-transparent",
                index%2==0 ? "hover:border-green-800" : "hover:border-white"
              )}
            onClick={moreInfoOrder}
          >
            More
          </Button>
          <Button 
            className={cn(
              "cursor-pointer bg-transparent hover:bg-transparent", 
              index%2===1 ? "text-white" :"text-black dark:text-white" ,
                "border border-transparent",
                index%2==0 ? "hover:border-green-800" : "hover:border-white"
            )}
            onClick={updateOrder}
    
          >
            Update
          </Button>
          <Button 
            className={cn(
              "cursor-pointer bg-transparent hover:bg-transparent", 
              index%2===1 ? "text-white" :"text-black dark:text-white" ,
                "border border-transparent",
                index%2==0 ? "hover:border-green-800" : "hover:border-white"
            )}
            onClick={deleteOrder}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  )
});


const OrderPagination = memo((
  { totalPages , currentPage }:
  { 
    totalPages:number;
    currentPage:number;
  }
) => {
  const dispatch = useDispatch<AppDispatch>();
  return(
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onUpdatePage={(page) => dispatch(updatePage({ page })) }
      nextPage={() => dispatch(nextPage())}
      prevPage={() => dispatch(prevPage())}
    />
  )
});




const OrdersTable: React.FC = memo( () => {

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [ isOpenOrderMoreInfo , setIsOpenOrderMoreInfo  ]= useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const isOpen = useSelector((store: RootState) => ( store.popup.orderStatusUpdatePopUp ));
  const orderStatuses = useSelector((store: RootState) => ( store.orderTableFilters.orderStatus ));
  const paymentStatuses = useSelector((store: RootState) => ( store.orderTableFilters.paymentStatus ));
  const page = useSelector((store: RootState) => ( store.orderTableFilters.page ));
  const limit = useSelector((store: RootState) => ( store.orderTableFilters.limit ));
  const sort = useSelector((store: RootState) => ( store.orderTableFilters.sort ));





  const getAllOrdersMutation = useGetAllOrders({ orderStatuses , paymentStatuses , page , limit , sort });

  const openDeleteModal = useCallback(() => {
    setIsOpenDeleteModal(true);
  },[]);

  const openMoreInfoModal = useCallback(() => {
    setIsOpenOrderMoreInfo(true);
  },[]);


  if(getAllOrdersMutation.isLoading){
    return <div className="flex items-center justify-center mt-4">
      <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
      />
    </div>
  }

  const orders : Order[] = getAllOrdersMutation.data?.data?.data ?? [];
  const totalPages = getAllOrdersMutation.data?.data?.totalPages ?? 1;
  const currentPage = getAllOrdersMutation.data?.data?.currentPage ?? 1;


  if(!orders.length){
    return(
      <div className="flex justify-center items-center mt-4">
        <h1 className="text-[16px] font-mont font-medium">No Orders Found</h1>
      </div>
    )
  }


  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <TableHead/>
        <tbody>
          { orders.map((order, index) => (
            <TableRow 
              order={order} index={index}  
              selectOrder={() => setSelectedOrder(order) } 
              openDeleteModal={openDeleteModal}
              openMoreInfoModal={openMoreInfoModal}
              key={index}
            />
          ))}
        </tbody>
      </table>
      <OrderPagination totalPages={totalPages}  currentPage={currentPage}/>
      <PopUp
        keyProp={'update-order'}
        model={(close) => <OrderUpdateStatusModal close={close} order={selectedOrder as Order} />}
        isOpen={isOpen}
        handleClose={() => dispatch(closeOrderStatusUpdatePopUp()) }
      />
      <PopUp
        keyProp={'delete-order'}
        model={(close) => <DeleteOrderModal close={close} id={selectedOrder?._id as string } />}
        isOpen={isOpenDeleteModal}
        handleClose={() => setIsOpenDeleteModal(false)  }
      />
      <FullCoverPoup
          modal={(close) => (
           <OrderDetailPopup close={close} order={selectedOrder as Order} />
          )}
          isOpen={isOpenOrderMoreInfo}
          handleClose={() => setIsOpenOrderMoreInfo(false)}
      />
    </div>
  );
});

export default OrdersTable;