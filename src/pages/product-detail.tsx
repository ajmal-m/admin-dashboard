import { memo } from "react";
import { useParams } from "react-router";

const ProductDetail = memo(() => {
    const params = useParams();
    return(
        <section className="min-h-screen px-10 max-[992px]:px-4 mt-3">
            <h1>Product Detail {params.pId}</h1>
            <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/da/cms-assets/cms/product/321082da-934f-48a8-b340-f42ba20136a7.jpg" alt="" srcset="" />
        </section>
    )
});

export default ProductDetail;