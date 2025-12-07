import { memo } from "react";
import { useParams } from "react-router";

const ProductDetail = memo(() => {
    const params = useParams();
    return(
        <section className="min-h-screen px-10 max-[992px]:px-4 mt-3">
            <h1>Product Detail {params.pId}</h1>
        </section>
    )
});

export default ProductDetail;