import  { memo, useEffect, useRef } from "react";
import PopUp from "../pop-up";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const CloseIcon = memo( () => {
  return(
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18 17.94 6M18 18 6.06 6"
      />
    </svg>
  )
});


const ImageCanvas = memo(( { image } : { image : string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        try {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                const canvas = canvasRef.current;
                if(!canvas){
                    console.log("No Canvas found");
                    return;
                }
                const ctx = canvas.getContext("2d");
                
                if(!ctx) return;

                canvas.width = img.width + 100 ;
                canvas.height = img.height + 100;

                ctx.fillStyle = "#ede3e3"

                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(img,50,50);
            }
        } catch (error) {
            console.log(error);
        }
    },[])
    return(
        <canvas id="image-crop" ref={canvasRef}>
        </canvas>
    )
});



const ImageCropModal = memo(({ image}: { image : string;}) => {
    return(
    <>
        <PopUp
            trigger={(open) => (
                <Button variant={'ghost'} type="button" size={'sm'} className={cn("cursor-pointer mt-1")} onClick={open}>Crop</Button>
            )}
            model={(close) => (
                <div className="min-w-100 min-h-100 bg-green-950 flex flex-col items-center p-4 rounded">
                    <button onClick={close} type="button" className="self-end cursor-pointer">
                        <CloseIcon/>
                    </button>
                    <div className="mt-4">
                        <ImageCanvas  image={image}/>
                    </div>
                    <div className="mt-2">
                        <Button type="button" className={cn("bg-green-600 hover:bg-green-700 cursor-pointer")} size={'sm'}>Done</Button>
                    </div>
                </div>
            )}
            keyProp='image-crop-modal'
        />
    </>
    )
});

export default ImageCropModal;