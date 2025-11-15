import { memo } from "react";
import Navbar from "../components/navbar";

const HomePage = memo(() => {
    return(
        <>
            <Navbar/>
        </>
    )
});

export default HomePage;