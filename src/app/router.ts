import AdminLayout from "@/layouts/admin-layout";
import MainLayout from "@/layouts/main-layout";
import {  lazy } from "react";
import { createBrowserRouter } from "react-router";


const HomePage = lazy(() => import('../pages/home'));
const AboutPage = lazy(() => import('../pages/about'));
const ProductPage = lazy(() => import('../pages/product'));
const ProductDetailPage = lazy(() => import("../pages/product-detail"));
const ProductByCategoryPage = lazy(() => import("../pages/products-by-category"));
const ContactPage= lazy(() => import('../pages/contact'));
const ServicePage = lazy(() => import('../pages/service'));
const OrdersPage = lazy(() => import('../pages/orders'));
const OrderDetailPage = lazy(() => import('../pages/order-detail'));


const AdminPage = lazy(() => import('../pages/admin/admin-home'));
const AdminProducts = lazy(() => import('../pages/admin/admin-products'));
const AdminCategories = lazy(() => import('../pages/admin/admin-category'));
const AdminOrders = lazy(() => import('../pages/admin/admin-orders'));

import AuthenticatedLayout from "@/layouts/authenticated-layout";




const router = createBrowserRouter([
    {
        path:'/',
        Component : AuthenticatedLayout,
        children:[
            {
                path:'/',
                Component: MainLayout,
                children:[
                    {
                        index:true,
                        Component:HomePage
                    },
                     {
                        path:"about",
                        Component: AboutPage
                    },
                    {
                        path: 'products' ,
                        Component:ProductPage
                    },
                    {
                        path:"contact",
                        Component:ContactPage
                    },
                    {
                        path:"service",
                        Component:ServicePage
                    },
                    {
                        path:"/pd/:pId",
                        Component:ProductDetailPage
                    },
                    {
                        path:"/cd/:cne/:cId",
                        Component: ProductByCategoryPage,
                    },
                    {
                        path:"/orders",
                        Component:OrdersPage
                    },
                    {
                        path:"/order/:id",
                        Component:OrderDetailPage
                    }
                ]
            },
            {
                path:"/admin",
                Component:AdminLayout,
                children:[
                    {
                        index:true,
                        Component:AdminPage
                    },
                    {
                        path:"categories",
                        Component:AdminCategories
                    },
                    {
                        path:'products',
                        Component:AdminProducts
                    },
                    {
                        path:"orders",
                        Component: AdminOrders
                    }
                ]
            }
        ]
    },
]);

export default router;