import { useState, useEffect, useRef } from "react";

const Timer = ({ setThisProduct, setIsDeleting, id }) => {
    const [remainingTime, setRemainingTime] = useState(20);
    const [intervalId, setIntervalId] = useState(null);

    const timerRef = useRef();

    useEffect(() => {
        console.log('counter start');
        const localIntervalId = setInterval(() => {
            setRemainingTime(prev => prev - 1);
        }, 1000);

        setIntervalId(localIntervalId);

        return () => {
            clearInterval(intervalId);
        }
    }, [])

    useEffect(() => {
        if (remainingTime === 0) {
            setIsDeleting(false);
            // FIXME: Should I indicate in the URL name that the product will be removed?
            fetch(`http://localhost:8080/products/${id}`, { method: 'DELETE' })
                .then(resp => {
                    if (resp.status === 204)
                        setThisProduct(null);
                })
                .catch(err => alert('Server error!'));
        }
    }, [remainingTime])

    function restore(e) {
        e.stopPropagation();
        fetch(`http://localhost:8080/products/${id}`, { method: 'PATCH' })
            .then(resp => {
                if (resp.status === 204) {
                    console.log('resotring');
                    setRemainingTime(60);
                    setIsDeleting(false);
                }
            })
            .catch(err => alert('Server error'));
    }


    return (
        <div ref={timerRef} >
            <h3>Complete removal will occur in a: </h3>
            <h2>{remainingTime} s</h2>
            <button onClick={(e) => restore(e)}>Restore!</button>
        </div>
    )
}

export default Timer;