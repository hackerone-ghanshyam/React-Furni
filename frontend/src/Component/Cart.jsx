import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"

function Cart() {
    const { state } = useLocation();
    const products = state?.products || [];

    const [quantities, setQuantities] = useState(products.map(() => 1));

    // Increase quantity
    const increase = (index) => {
        const updated = [...quantities];
        updated[index] += 1;
        setQuantities(updated);
    };

    // Decrease quantity
    const decrease = (index) => {
        const updated = [...quantities];
        if (updated[index] > 1) {
            updated[index] -= 1;
            setQuantities(updated);
        }
    };

    // Remove product from cart
    const removeItem = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        const updatedQuantities = quantities.filter((_, i) => i !== index);

        // Update browser history state
        window.history.replaceState({ products: updatedProducts }, "");

        setQuantities(updatedQuantities);
    };

    // Calculate grand total
    const grandTotal = products.reduce((sum, product, index) => {
        const price = Number(product.price.replace("$", ""));
        return sum + price * quantities[index];
    }, 0);

    // ✅ Proceed button function
    const navigate = useNavigate();

    const handleProceed = async () => {
        // ❌ Cart empty
        if (!products || products.length === 0) {
            Swal.fire("Cart is empty");
            return;
        }

        // ✅ Login + user data fetch
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const user = JSON.parse(localStorage.getItem("user"));

        // ❌ User not logged in OR email missing
        if (
            !isLoggedIn ||
            !user ||
            !user._id ||
            !user.email
        ) {
            Swal.fire({
                icon: "warning",
                title: "Please login first",
                text: "You must sign in to place an order",
            });

            localStorage.clear(); // 🔥 important
            navigate("/signin");
            return;
        }

        // ✅ Prepare order products
        const orderData = products.map((product, index) => {
            const price = Number(product.price.replace("$", ""));
            return {
                product: product.title,
                price: price,
                quantity: quantities[index],
                total: price * quantities[index],
            };
        });

        // ✅ Payload exactly matching backend
        const payload = {
            userId: user._id,
            email: user.email,
            products: orderData,
            grandTotal: grandTotal,
        };

        try {
            await axios.post(
                "http://localhost:2222/user/Order",
                payload
            );

            Swal.fire({
                icon: "success",
                title: "Order placed successfully",
                timer: 2000,
                showConfirmButton: false,
            });

            // clear cart
            window.history.replaceState({ products: [] }, "");
            setQuantities([]);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to place order", "error");
        }
    };

    return (
        <>
            <div className="hero">
                <div className="container">
                    <h1>Cart</h1>
                </div>
            </div>

            <div className="container mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length > 0 ? (
                            <>
                                {products.map((product, index) => {
                                    const numericPrice = Number(product.price.replace("$", ""));
                                    const total = numericPrice * quantities[index];

                                    return (
                                        <tr key={index}>
                                            <td><img src={product.img} width={60} /></td>
                                            <td>{product.title}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button onClick={() => decrease(index)}>-</button>
                                                <span style={{ padding: "0 10px" }}>{quantities[index]}</span>
                                                <button onClick={() => increase(index)}>+</button>
                                            </td>
                                            <td>${total.toFixed(2)}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => removeItem(index)}>X</button>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {/* 🔹 Grand Total Row */}
                                <tr>
                                    <td colSpan="4" className="text-end fw-bold">
                                        Grand Total
                                    </td>
                                    <td className="fw-bold">${grandTotal.toFixed(2)}</td>
                                    <button
                                        className="btn btn-success"
                                        onClick={handleProceed}
                                        style={{ marginBottom: "100px" }}
                                    >
                                        Proceed
                                    </button>
                                </tr>
                            </>
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No items in cart.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Cart;
