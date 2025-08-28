import { useDispatch } from "react-redux";
import { addToCart, clearCart } from "../features/cartSlice";

export default function CartTest() {
  const dispatch = useDispatch();
  const fake = { id: 1, title: "Test Product", price: 100 };

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => dispatch(addToCart(fake))}>
        Add Test Product
      </button>

      <button style={{ marginLeft: 8 }} onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>
    </div>
  );
}
