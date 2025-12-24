import { memo, useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const MultiCheckBoxSelector = memo((
    {
        options,label, updateState, id
    }:
    {
        options: { name: string; value: string}[];
        label:string;
        updateState: (val: string[]) => void;
        id:string;
    }
) => {

    const [show, setShow] = useState<boolean>(false);
    const [checkedValues , setCheckedValues] = useState<string[]>([]);

    const updateCategory = useCallback(( e : React.ChangeEvent<HTMLInputElement> , id : string) => {
        const checked = e.target.checked;
        if(checked){
            setCheckedValues((checkedVal) => [ ...checkedVal , id ]);
        }else{
            const newIds = [ ...checkedValues].filter((cId) => cId != id );
            setCheckedValues(newIds);
        }
    },[checkedValues]);

    const filterProduct = useCallback(() => {
        setShow(false);
        updateState(checkedValues);
    },[checkedValues ]);

    useEffect(() => {
        const closeFunction = (e : MouseEvent ) : void => {
            const parent = e.target?.closest(`#parent-${id}`);
            if(!parent) setShow(false);
        };
        document.addEventListener("click",closeFunction);
        return () => document.removeEventListener("click", closeFunction);
    },[])

    return(
        <div className="relative" id={`parent-${id}`}>
            <Button 
                className={
                    cn(
                        "bg-green-900 rounded font-mont font-normal",
                        "relative z-49", "cursor-pointer", "min-w-50"
                    )
                }
                onClick={() => setShow((s) => !s)}
            >
                {
                    checkedValues.length ?  `${checkedValues.length} items selected` :  label
                }
            </Button>
            {
                show && (
                    <div 
                        className={
                            cn(
                                "z-48 absolute top-full left-0 right-0 bg-green-900 text-white",
                                "transition-all duration-300 ease-in-out px-4 py-2 pr-0",
                            )
                        }
                        id={id}
                    >
                        <ul 
                            className={
                                cn(
                                    " bg-green-900 text-white max-h-50 overflow-y-auto",
                                )
                            }
                        >
                            {
                                options.map((opt) => (
                                    <li className="flex items-center py-1" key={opt.value}>
                                        <input 
                                            type="checkbox" 
                                            name="cat" id={`cate-${opt.name}`} 
                                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => updateCategory(e, opt.value )} 
                                            checked={checkedValues.includes(opt.value)} 
                                        />
                                        <span className="text-[12px] text-white font-mont font-normal ml-2">{opt.name}</span>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="w-full pr-4">
                             <Button
                                className={
                                    cn(
                                        "bg-green-800 rounded text-white font-mont",
                                        "my-2 w-full text-[12px] font-normal", "cursor-pointer"
                                    )
                                }
                                onClick={filterProduct}
                            >
                                Filter
                            </Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
});

export default MultiCheckBoxSelector;