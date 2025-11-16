import { memo } from "react";


const AddCategoryModal = memo(({
    close
}: { close : () => void}) => {
    return(
         <div className="relative bg-green-800 rounded shadow-sm p-4 md:p-6 font-mont text-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
        <h3 className="text-lg text-heading">
          New Category
        </h3>

        <button
          type="button"
          onClick={close}
          className="cursor-pointer"
        >
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
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      {/* Body */}
      <form className="pt-4 md:pt-6">
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2.5 text-sm text-heading"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border border-white text-heading text-sm outline-none rounded-base block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Enter category name"
            required
          />
        </div>

        {/* Image uploader */}
        <div>
          <label
            htmlFor="password"
            className="block mb-2.5 text-sm text-heading"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 text-black font-medium border bg-[white] border-transparent 
          hover:bg-brand-strong shadow-xs leading-5 rounded text-sm px-4 py-2.5 w-full cursor-pointer
          "
        >
          Add
        </button>

      </form>
    </div>
    )
});

export default AddCategoryModal;