import { useState, memo, type ReactNode } from "react";
import {motion, AnimatePresence } from 'framer-motion';

type PopUpType = {
    model: (handleClose: () => void) => ReactNode; 
    trigger:  (handleClose: () => void) => ReactNode;
    keyProp:string | number;
}

const  PopUp = memo( (

    {  model, trigger , keyProp } : PopUpType

) => {
  
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    return (
        <>
        {
            trigger(handleOpen)
        }
        {
            isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <AnimatePresence >

                        {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        aria-modal="true"
                                        role="dialog"
                                        key={keyProp}
                                    >
                                        {model(handleClose)}
                                    </motion.div>

                        )}
                    </AnimatePresence>
                </div>)
        }
        </>
    );
});

export default PopUp;