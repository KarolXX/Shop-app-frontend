import { useState, useEffect } from "react";
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const pageProductsNumber = 11;

    useEffect(() => {
        console.log('render from App.js');
        fetch(`http://localhost:8080/products?size=${pageProductsNumber}&page=${page}`)
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp);
                setProducts(resp);
            })
    }, [page]);

    return (
        <div className="Menu">
            <h1 className="Menu__title">React + Spring</h1>
            <div className="Menu__items">
                {products.map(product => {
                    return <Product
                        product={product}
                    />
                })}
            </div>
            <button onClick={() => setPage((prev) => prev - 1)}>Previous page</button>
            <button onClick={() => setPage((prev) => prev + 1)}>Next page</button>
        </div>
    );
}

export default Products;