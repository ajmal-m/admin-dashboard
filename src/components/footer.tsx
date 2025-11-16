import { memo } from "react";


const Sections = [
      { title: "ABOUT", items: ["Who we are?", "Privacy Policy"] },
      { title: "HELP", items: ["Support", "Help Center"] },
      { title: "CONTACT", items: ["Terms & Condition", "Return & Exchange Policy"] },
      { title: "FOLLOW US", items: ["Facebook", "Instagram"] }
    ];

const Footer = memo(() => {
    return(
       <footer className="min-h-[100px] bg-[#C6EAD7] dark:bg-[#C6EAD7] mt-[30px] py-[30px] px-10 max-[600px]:py-2 max-[600px]:px-4 ">
        <div className="grid grid-cols-4 max-[859px]:grid-cols-3 max-[663px]:grid-cols-2 max-[410px]:grid-cols-1 gap-4">
            {
                Sections.map((section) => (
                    <ul className="font-mont text-[14px]" key={section.title}>
                        <li className="text-[16px] font-medium">{section.title}</li>
                        {
                            section.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))
                        }
                    </ul>
                ))
            }
        </div>
       </footer>
    )
});

export default Footer;