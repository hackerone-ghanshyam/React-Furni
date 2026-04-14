import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Shop() {
    const navigate = useNavigate();
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductClick = (product) => {
        setSelectedProducts((prev) => [...prev, product]);
        console.log("Added to cart:", product);
    };

    const goToCart = () => {
        navigate("/cart", { state: { products: selectedProducts } });
    };

    const products = [
        { img: "images/product-3.png", title: "Nordic Chair", price: "$50.00" },
        { img: "images/product-1.png", title: "Nordic Chair", price: "$100.00" },
        { img: "images/product-2.png", title: "Kruzo Aero Chair", price: "$78.00" },
        { img: "images/product-3.png", title: "Ergonomic Chair", price: "$43.00" },
        { img: "images/product-1.png", title: "Nordic Chair", price: "$50.00"},
        { img: "images/product-3.png", title: "Ergonomic Chair", price: "$43.00"},
        { img: "images/product-1.png", title: "Nordic Chair", price: "$65.00"},
    ];

    return (
        <>
            <h1>Shop</h1>

            <button
                style={{ margin: "20px", padding: "10px 20px" }}
                onClick={goToCart}
            >
                Go to Cart ({selectedProducts.length})
            </button>

            <div className="row">
                {products.map((p, index) => (
                    <div key={index} className="col-4">
                        <div
                            className="product-item"
                            onClick={() => handleProductClick(p)}
                            style={{
                                cursor: "pointer",
                                border: "1px solid #ccc",
                                padding: "10px",
                                margin: "10px",
                            }}
                        >
                            <img src={p.img} className="img-fluid" />
                            <h3>{p.title}</h3>
                            <p>{p.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Shop;
