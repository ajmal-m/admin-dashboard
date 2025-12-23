import { cn } from "@/lib/utils";
import { getPagination } from "@/utils/utils";
import { memo } from "react";

const Pagination = memo((
    { totalPages , currentPage , onUpdatePage , nextPage , prevPage}:
    {
        totalPages: number;
        currentPage:number;
        onUpdatePage: (page: number) => void;
        nextPage: () => void;
        prevPage:() => void;
    }
) => {
    const pages = getPagination({ current: currentPage , total: totalPages });
    return(
        <div className="h-12 w-full bg-green-900 mt-2 flex items-center justify-end px-4">
            <div className="flex items-center">
                <button
                    className={
                        cn(
                            `
                            w-10 h-10 bg-white p-2 font-mont font-medium
                            text-black border border-green-900 cursor-pointer
                            `
                        )
                    }
                    onClick={prevPage}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                    className="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                </button>
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
                                    onUpdatePage(Number(page))
                                }
                            }}
                        >
                            {page}    
                        </button>
                    ))
                }
                <button
                    className={
                        cn(
                            `
                            w-10 h-10 bg-white p-2 font-mont font-medium
                            text-black border border-green-900 cursor-pointer
                            `
                        )
                    }
                    onClick={nextPage}
                    disabled={totalPages == currentPage }
                >
                     <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                        stroke-linejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"
                        ><path d="m9 18 6-6-6-6"/></svg>
                </button>
               
            </div>
      </div>
    )
});

export default Pagination;