import { memo } from "react";
import HomeBanner from "../components/home-banner";
import CategorySection from "../components/category-container";
import Products from "../components/products-list-home";

const HomePage = memo(() => {
    return(
        <>
            <HomeBanner/>
            <CategorySection/>
            <Products/>
        </>
    )
});

export default HomePage;