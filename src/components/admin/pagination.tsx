import { cn } from "@/lib/utils";
import { getPagination } from "@/utils/utils";
import { memo, useState } from "react";

const Pagination = memo(() => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pages = getPagination({ current: currentPage , total: 10});
    return(
        <div className="h-12 w-full bg-green-900 mt-2 flex items-center justify-end px-4">
            <div className="flex items-center">
                {
                    pages.map((page) => (
                        <button 
                            className={
                                cn(
                                    ` w-10 h-10 bg-white p-2 font-mont font-medium
                                    text-black border border-green-900 cursor-pointer`,
                                    page == currentPage && "bg-green-400"
                                )
                            }
                            key={page}
                            onClick={() => {
                                if(!isNaN(Number(page)) ){
                                    setCurrentPage(page as number)
                                }
                            }}
                        >
                            {page}    
                        </button>
                    ))
                }
            </div>
      </div>
    )
});

export default Pagination;