import React from "react";


const rows = [
    "Category Name",
    "Image",
    "Action"
]

const CategoryTable: React.FC = () => {
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="bg-neutral-secondary-soft border-b border-default">
          <tr>
            {
                rows.map((rowItem) => (
                     <th scope="col" className="px-6 py-3 font-medium font-mont text-[16px]" key={rowItem}>{rowItem}</th>
                ))
            }
          </tr>
        </thead>
        <tbody>
          { new Array(10).fill(0).map((product, index) => (
            <tr
              key={product.name}
              className={`border-b border-default font-mont ${
                index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#0B6434] text-white'
              }`}
            >
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                Vegetables
              </th>
              <td className="px-6 py-4">Image</td>
              <td className="px-6 py-4">
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
