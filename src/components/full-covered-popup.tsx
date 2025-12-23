import React, { memo, useCallback } from "react";

const FullCoverPoup = memo((
    {
        modal,
        isOpen,
        handleClose
    }:
    {
        modal: (close : () => void) => React.ReactNode;
        isOpen:boolean;
        handleClose: () => void;
    }
) => {
    const closePopUp = useCallback((e : React.MouseEvent ) => {
        handleClose?.();
    },[])
    return(
        <>
        {
            isOpen && (
                <div className="fixed w-full h-full top-0 left-0 bg-black/80 z-51 flex justify-center items-center" onClick={closePopUp}>
                    {
                        modal(handleClose)
                    }
                </div>
            )
        }
        </>
    )
});

export default FullCoverPoup;