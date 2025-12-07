import AdminLayout from "@/layouts/admin-layout";
import MainLayout from "@/layouts/main-layout";
import {  lazy } from "react";
import { createBrowserRouter } from "react-router";


const HomePage = lazy(() => import('../pages/home'));
const AboutPage = lazy(() => import('../pages/about'));
const ProductPage = lazy(() => import('../pages/product'));
const ContactPage= lazy(() => import('../pages/contact'));
const ServicePage = lazy(() => import('../pages/service'));

const AdminPage = lazy(() => import('../pages/admin/admin-home'));
const AdminProducts = lazy(() => import('../pages/admin/admin-products'));
const AdminCategories = lazy(() => import('../pages/admin/admin-category'));




const router = createBrowserRouter([
    {
        path: '/',
        Component:MainLayout,
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
            }
        ]
    }
]);

export default router;