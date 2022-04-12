import { useEffect, useRef } from "react";

const Form = ({ id, setThisProduct, setIsUpdating }) => {
    const formRef = useRef();

    useEffect(() => {
        formRef.current.addEventListener('submit', e => {
            e.preventDefault();
            fetch(`http://localhost:8080/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formRef.current.elements.name.value,
                    amount: formRef.current.elements.amount.value
                })
            }).then(resp => {
                if (resp.status === 204) {
                    //FIXME: Should I send the updated resource using the PUT method ?
                    fetch(`http://localhost:8080/products/${id}`)
                        .then(resp => resp.status === 200 && resp.json())
                        .then(data => setThisProduct(data));
                }
            })

            setIsUpdating(false);
        });
    }, [])

    return (
        <form ref={formRef} className="Form">
            <input type="text" name="name" />
            <input type="number" name="amount" />
            <button className="Form__btn" type="submit">Update</button>
        </form>
    );
}

export default Form;