import { useState, memo, type ReactNode } from "react";
import {motion, AnimatePresence } from 'framer-motion';

type PopUpType = {
    model: (handleClose: () => void) => ReactNode; 
    trigger:  (handleClose: () => void) => ReactNode;
    keyProp:string | number;
}

const modalVariants = {
    hidden: { opacity: 0, y: -200, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
    exit:   { opacity: 0, y:-20, scale: 0.98, transition: { duration: 0.18 } },
};

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
        <AnimatePresence>
            {
                isOpen && (
                    <motion.div className="fixed inset-0 z-50 flex justify-center p-4">

                            <motion.div
                                aria-modal="true"
                                role="dialog"
                                key={keyProp}
                                variants={modalVariants}

                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                {model(handleClose)}
                            </motion.div>
                    </motion.div>)
            }
        </AnimatePresence>
        </>
    );
});

export default PopUp;