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
import { timeAgo } from "@/utils/utils";
import { DeleteOrderModal } from "./delete-order-modal";

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


const TableRow = memo(({ order , index , selectOrder , openDeleteModal}: { order : Order ; index: number ; selectOrder : () => void;openDeleteModal:( ) => void } ) => {
  const dispatch = useDispatch<AppDispatch>();

  const updateOrder = useCallback(() => {
    selectOrder(); 
    dispatch(openOrderStatusUpdatePopUp());
  },[selectOrder]);

  const deleteOrder = useCallback(() => {
    selectOrder();
    openDeleteModal();
  },[selectOrder, openDeleteModal])

  
  return(
    <tr
      key={order._id}
      className={`border-b border-default font-mont ${
        index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#0B6434] text-white'
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
        {order.orderStatus}
      </th>
      <td className="px-6 py-4">
        {order.shippingAddress.city}
        <br />
        {order.shippingAddress.state }
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap capitalize">
        {order.payment.status}
      </th>
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {timeAgo(order.createdAt)}
      </th>
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {timeAgo(order.updatedAt)}
      </th>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* <EditProduct product={product} evenRow={index % 2 === 0}/> */}
          <Button 
            className={cn("cursor-pointer bg-transparent hover:bg-transparent", index%2===1 ? "text-white" :"text-black" )}
            onClick={updateOrder}
    
          >
            Update
          </Button>
          <Button 
            className={cn("cursor-pointer bg-transparent hover:bg-transparent", index%2===1 ? "text-white" :"text-black" )}
            onClick={deleteOrder}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  )
})




const OrdersTable: React.FC = memo( () => {

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const getAllOrdersMutation = useGetAllOrders();
  const isOpen = useSelector((store: RootState) => ( store.popup.orderStatusUpdatePopUp ));
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const openDeleteModal = useCallback(() => {
    setIsOpenDeleteModal(true);
  },[])


  if(getAllOrdersMutation.isLoading){
    return <div className="flex items-center justify-center">
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


  if(!orders.length){
    return(
      <div>
        <h1>No Orders Found</h1>
      </div>
    )
  }


  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <TableHead/>
        <tbody>
          { orders.map((order, index) => (
            <TableRow order={order} index={index}  selectOrder={() => setSelectedOrder(order) } openDeleteModal={openDeleteModal}/>
          ))}
        </tbody>
      </table>
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
    </div>
  );
});

export default OrdersTable;