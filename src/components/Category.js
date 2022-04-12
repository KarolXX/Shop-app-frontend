import { useState, useEffect } from 'react';
import Product from './Product';

export const Category = ({ category }) => {
    const [thisCategory, setThisCategory] = useState(category);
    const [products, setProducts] = useState([]);
    // FIXME (probably with useReducer): 
    // if the categories are fetched again, 
    // the products are also fetched again 
    const [areProducts, setAreProducts] = useState(false);

    const id = category.id;

    useEffect(() => {
        if (areProducts) {
            getProducts();
        }
    }, [thisCategory])

    function getProducts() {
        // I don't have to fetch products bcs of my JOIN FETCH 
        fetch(`http://localhost:8080/categories/${id}/products`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setProducts(data);
            })
        //setProducts(category.products);
        setAreProducts(true);
    }

    function hideProducts() {
        setAreProducts(false);
        setProducts([]);
    }

    function deleteCategory() {
        fetch(`http://localhost:8080/categories/${id}`, { method: 'DELETE' });
        setThisCategory(null);
    }

    return (
        thisCategory ?
            <>
                <div className="Menu__item--category">
                    <div className="categoryTitle">
                        {thisCategory.name}
                        <i className="totalQuantity">{thisCategory.totalQuantity} products </i>
                    </div>
                    {areProducts ?
                        <button className="Menu__btn" onClick={() => hideProducts()}>
                            HIDE
                        </button>
                        :
                        <button className="Menu__btn" onClick={() => getProducts()}>
                            Expand
                        </button>
                    }
                    <button onClick={() => deleteCategory()}>X</button>
                </div>
                <div className="Menu__items">
                    {products.map(product => <Product
                        product={product}
                    />)}
                </div>
            </>
            :
            null
    );
}
