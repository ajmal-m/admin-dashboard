import { memo } from "react";
import Navbar from "../components/navbar";
import HomeBanner from "../components/home-banner";

const HomePage = memo(() => {
    return(
        <>
            <Navbar/>
            <HomeBanner/>
        </>
    )
});

export default HomePage;