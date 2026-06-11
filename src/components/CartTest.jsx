import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQty,
} from "../features/cartSlice";

export default function CartTest() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQty = useSelector(selectCartTotalQty);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleCheckout = () => {
    dispatch(clearCart());
    alert("Checkout successful! Your cart has been cleared.");
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
                background: "#1f2937",
                color: "white",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "contain",
                  background: "white",
                }}
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/150";
                }}
              />

              <div>
                <h3>{item.title}</h3>
                <p>Quantity: {item.qty}</p>
                <p>Price: ${item.price}</p>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total Products: {totalQty}</h3>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}
