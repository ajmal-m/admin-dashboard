import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {  memo } from "react";

const AdminHomePage = memo(() => {
    return(
        <>
            <h1>Admin Home Page</h1>
            <Button
                className={
                    cn("bg-red-800 cursor-pointer hover:bg-red-900")
                }
                onClick={() => alert("My name is AJMAL")}
            >Hello World</Button>
        </>
    )
});

export default AdminHomePage;