import { useState } from "react";
import Form from "./Form";
import Timer from "./Timer";

const Product = ({ product }) => {
    // `thisProduct` is here to avoid fetching each product from the server. 
    // When I remove / update this product,
    // this product will be changed (setThisProduct) without having to fetch each product
    const [thisProduct, setThisProduct] = useState(product);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const id = product.id;

    function deleteProduct(e) {
        e.stopPropagation();
        // old version: http://localhost:8080/potentialRemoval/{id}
        // your suggestion: `http://localhost:8080/products/${id}/product-remove`
        fetch(`http://localhost:8080/products/${id}`, { method: 'PATCH' })
            .then(resp => {
                if (resp.status === 204)
                    setIsDeleting(true);
                else
                    throw 'Incorrect status'
            })
            .catch(e => console.log(e))
    }

    function changeAmount(e, type) {
        e.stopPropagation();
        // when amount == 0 && change == "minus"
        if (type === "minus" && thisProduct.amount < 1)
            return null;

        let difference; // Can I use let or should I use state ?
        type === "plus" ? difference = 1 : difference = -1;

        fetch(`http://localhost:8080/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                amount: thisProduct.amount + difference
            })
        })
            .then(resp => {
                if (resp.status !== 200) {
                    throw 'Incorrect status';
                }

                return resp.json();
            })
            .then(data => setThisProduct(data))
            .catch(e => console.log(e));
    }

    function getFormToUpdate() {
        setIsUpdating(true);
    }

    return (
        thisProduct !== null ?
            <div key={id} className="Menu__item--product" onClick={() => getFormToUpdate()}>
                {isUpdating ?
                    <Form
                        id={id}
                        setThisProduct={setThisProduct}
                        setIsUpdating={setIsUpdating}
                    />
                    :
                    isDeleting || !product.active /* when the program is interrupted during the countdown */ ?
                        <Timer
                            setThisProduct={setThisProduct}
                            setIsDeleting={setIsDeleting}
                            id={id}
                        />
                        :
                        <>
                            <h2>{thisProduct.name}
                                <button onClick={(e) => deleteProduct(e)}>X</button>
                            </h2>
                            <hr></hr>
                            <h3>Amount: {thisProduct.amount}</h3>
                            <button onClick={(e) => changeAmount(e, "plus")}>+</button>
                            <button onClick={(e) => changeAmount(e, "minus")}>-</button>
                        </>
                }
            </div>
            :
            null
    )
}

export default Product;