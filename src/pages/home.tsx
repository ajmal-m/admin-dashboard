import { memo } from "react";
import Navbar from "../components/navbar";
import HomeBanner from "../components/home-banner";
import CategorySection from "../components/category-container";
import Products from "../components/products-list-home";

const HomePage = memo(() => {
    return(
        <>
            <Navbar/>
            <HomeBanner/>
            <CategorySection/>
            <Products/>
        </>
    )
});

export default HomePage;