import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string; // optional (default w-96)
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, width = "w-96" }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40"
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-screen p-4 bg-neutral-primary-soft z-50 
          transition-transform duration-300 overflow-y-auto
          ${width}
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          bg-white border border-green-800
        `}
      >
        <div className="border-b border-default pb-4 mb-5 flex items-center">
          <h5 className="inline-flex items-center text-lg font-medium text-body">
            <svg
              className="w-5 h-5 me-1.5"
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
                d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Right drawer
          </h5>

          <button
            type="button"
            onClick={onClose}
            className="text-body bg-transparent hover:text-heading hover:bg-neutral-tertiary rounded-base w-9 h-9 absolute top-2.5 end-2.5 flex items-center justify-center"
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
          </button>
        </div>

        <p className="mb-3 text-sm text-body">
          Upgrade your Figma toolkit with a design system built on top{" "}
          <a className="font-medium text-heading underline hover:no-underline" href="#">
            Flowbite CSS
          </a>
          featuring variants, style guide and auto layout.
        </p>

        <p className="mb-5 text-sm text-body">
          Recommended for professional developers and companies building enterprise-level.
        </p>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5"
          >
            Pricing & FAQ
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center text-white bg-brand border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5"
          >
            Get access
            <svg
              className="rtl:rotate-180 w-4 h-4 ms-1.5 -me-0.5"
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
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Drawer;
