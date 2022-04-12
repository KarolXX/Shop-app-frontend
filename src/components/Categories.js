import { useState, useEffect } from 'react';
import { Category } from './Category';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setCategories(data);
            })
    }, [])

    return (
        <div className="Menu">
            <h1 className="Menu__title">CATEGORIES</h1>
            <div className="Menu__items categories">
                {categories.map(category => <Category
                    category={category}
                />)}
            </div>
        </div>
    );
}

export default Categories;