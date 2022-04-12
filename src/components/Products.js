import { useState, useEffect } from "react";
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log('render from App.js');
        fetch("http://localhost:8080/products")
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp);
                setProducts(resp);
            })
    }, []);

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
        </div>
    );
}

export default Products;