import { memo } from "react";
import Navbar from "../components/navbar";
import HomeBanner from "../components/home-banner";
import CategorySection from "../components/category-container";

const HomePage = memo(() => {
    return(
        <>
            <Navbar/>
            <HomeBanner/>
            <CategorySection/>
        </>
    )
});

export default HomePage;