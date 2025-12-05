import { memo, useCallback, useRef, useState } from "react";
import { Button } from "../ui/button";
import {  cn } from "@/lib/utils";
import { useCreateCategory } from "@/api/category/create-category";
import { Oval } from 'react-loader-spinner';
import {  useUpdateCategory } from "@/api/category/update-category";


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


type AddEditCategoryPropType = {
  close : () => void;
  currName?: string;
  currImage?: string;
  isEdit?: boolean;
  id ?: string;
  public_id ?:string;
}


const AddEditCategoryModal = memo(({
    close,
    currName,
    currImage,
    isEdit = false,
    id,
    public_id
}:AddEditCategoryPropType) => {

    const [image, setImage] = useState<string | null>( currImage ?? null);
    const [categoryName, setCategoryName] = useState<string>(currName ?? "");
    const createCategoryMutation = useCreateCategory({ close });
    const updateCategoryMutation = useUpdateCategory({ close});
    const imageRef = useRef<HTMLInputElement | null>(null);

    const updateImage = useCallback(( e : React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = e.target.files?.[0];
        if(!file) return;
        const preview = URL.createObjectURL(file);
        setImage(preview);
      } catch (error) {
        console.log(error);
      }
    },[]);


    const handleSubmit = useCallback( async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", categoryName);
      const file = imageRef.current?.files?.length ? imageRef.current.files[0] : null;
      if(file){
        formData.append("image", file);
      }
      if(isEdit){
        updateCategoryMutation.mutate({ data: formData, id , public_id });
      }else{
        createCategoryMutation.mutate(formData);
      }
    },[categoryName])

    return(
      <div className="relative bg-green-800 rounded shadow-sm p-4 md:p-6 font-mont text-white">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
          <h3 className="text-lg text-heading font-mont">
            { isEdit ? 'Edit' : 'New' } Category
          </h3>

          <button
            type="button"
            onClick={close}
            className="cursor-pointer"
          >
            <CloseIcon/>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Body */}
        <form className="pt-4 md:pt-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2.5 text-sm text-heading font-mont"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-white text-heading text-sm outline-none rounded-base block w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont"
              placeholder="Enter category name"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          {/* Image uploader */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2.5 text-sm text-heading font-mont" 
            >
              Upload Image
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              className="bg-neutral-secondary-medium border border-default-medium text-heading 
              text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 
              shadow-xs placeholder:text-body cursor-pointer"
              onChange={updateImage}
              required
              ref={imageRef}
            />
          </div>

          {
            image && (
              <div className="mt-1">
                <img src={image} alt="image-preview" className="max-h-[200px] max-w-[300px]" />
                <Button onClick={() => setImage(null)} variant={'ghost'} size={'sm'} className={cn("cursor-pointer mt-1")}>Remove</Button>
              </div>
            )
          }

          <button
            type="submit"
            className="mt-4 text-black font-medium border bg-[white] border-transparent 
            hover:bg-brand-strong shadow-xs leading-5 rounded text-sm px-4 py-2.5 w-full cursor-pointer
            font-mont h-10 flex items-center justify-center
            "
            disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
          >
            {
              (createCategoryMutation.isPending || updateCategoryMutation.isPending) ? (
              <div className="flex gap-2 items-center">
                <span>
                  {
                    createCategoryMutation.isPending ? "Uploading.." : "Updating.."
                  }
                </span>
                <Oval
                  visible={true}
                  height="20"
                  width="20"
                  color="#4fa94d"
                  strokeWidth='5'
                  animationDuration='0.5'
                  />
              </div>
              ) : (
                isEdit ? "Update" : "Add"
              )
            }
          </button>

        </form>
      </div>
    )
});

export default AddEditCategoryModal;