import  { memo, useCallback, useEffect, useRef, useState } from "react";
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
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement | null>(null)

    const points = useRef({ start:[0,0] , end:[0,0] });


    const drawCanvas = useCallback((img : HTMLImageElement) => {
        const canvas = canvasRef.current;
        if(!canvas){
            console.log("No Canvas found");
            return;
        }
        const ctx = canvas.getContext("2d");
        
        if(!ctx) return;

        canvas.width =  img.width + 50;
        canvas.height = img.height + 50;

        ctx.fillStyle = "#ede3e3"

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img,25,25);

        if(imgRef.current) return;
        imgRef.current = img;
    },[])

    useEffect(() => {
        try {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                drawCanvas(img)
            }
        } catch (error) {
            console.log(error);
        }
    },[]);


    const mouseDown = useCallback((e : React.MouseEvent<HTMLCanvasElement | MouseEvent>) => {
        if(isDrawing) return;
        setIsDrawing(true);
        const canvas = canvasRef.current;
        if(!canvas) return;
        const data = canvas.getBoundingClientRect();
        const [ left, top ] = [ e.clientX , e.clientY];
        points.current = { ...points.current , start: [ left-data.left , top-data.top] };
    },[isDrawing , points]);

    const mouseUp = useCallback(( e : React.MouseEvent<HTMLCanvasElement | MouseEvent> ) => {
        if(!isDrawing) return;
        const canvas = canvasRef.current;
        if(!canvas) return;
        const data = canvas.getBoundingClientRect();
        const [ left, top ] = [ e.clientX , e.clientY];
        points.current = { ...points.current , end: [ left-data.left , top-data.top] };
        lineDrawing();
        setIsDrawing(false);
    },[isDrawing, points]);


    const lineDrawing = useCallback(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext("2d");
        if(!ctx) return;
        clearLine();
        if(!imgRef.current) return;
        drawCanvas(imgRef.current);
        const { start : [ x1, y1] , end:[ x2, y2] } = points.current;
        lineDraw({ ctx , startX : x1 , startY : y1 , endX : x2 , endY : y1 });
        lineDraw({ ctx , startX : x2  , startY : y1 , endX : x2, endY : y2 });
        lineDraw({ ctx , startX : x2 , startY : y2, endX : x1, endY : y2 });
        lineDraw({ ctx , startX : x1 , startY : y2 , endX : x1, endY : y1 });

    },[points]);


    const lineDraw = useCallback(
        ({ ctx, startX, startY, endX, endY } : {
        ctx: CanvasRenderingContext2D,
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    }) => {
        if(!ctx) return;
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo( startX, startY);
        ctx.lineTo( endX, endY);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
    },[]);

    const clearLine = useCallback(() => {
         const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext("2d");
        if(!ctx) return;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        if(!imgRef.current) return;
        drawCanvas(imgRef.current);
    },[]);


    const onMouseMonving = useCallback((e : React.MouseEvent<HTMLCanvasElement | MouseEvent>) => {
        if(!isDrawing) return;
        const canvas = canvasRef.current;
        if(!canvas) return;
        const [ left, top ] = [ e.clientX , e.clientY];
        const data = canvas.getBoundingClientRect();
        points.current = { ...points.current , end: [ left-data.left , top-data.top] };
        lineDrawing();
    },[isDrawing])


    return(
        <>
           <canvas 
                id="image-crop" 
                ref={canvasRef}  
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseMove={onMouseMonving}
            >
            </canvas>
            <div className="mt-2 flex items-center justify-center">
                <Button type="button" className={cn("bg-red-600 hover:bg-red-700 cursor-pointer")} size={'sm'} onClick={clearLine}>Clear</Button>
                <Button type="button" className={cn("bg-green-600 hover:bg-green-700 cursor-pointer mx-2")} size={'sm'}>Done</Button>
            </div>
        </>
    )
});


const ImageModal = memo(({ image , close } : { image: string; close:() => void}) => {

    return(
        <div className="min-w-100 min-h-100 bg-green-950 flex flex-col items-center p-4 rounded">
            <button onClick={close} type="button" className="self-end cursor-pointer">
                <CloseIcon/>
            </button>
            <div className="mt-4">
                <ImageCanvas  image={image} />
            </div>
        </div>
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
                <ImageModal close={close} image={image} />
            )}
            keyProp='image-crop-modal'
        />
    </>
    )
});

export default ImageCropModal;