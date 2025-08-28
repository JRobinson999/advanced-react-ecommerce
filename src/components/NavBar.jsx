import { useSelector } from "react-redux";

export default function NavBar() {
  const cartItems = useSelector((state) => state.cart.items) || [];
  const totalQty = cartItems.reduce((n, i) => n + (i.qty ?? 1), 0);

  return (
    <nav style={{ padding: "10px", background: "#282c34", color: "white" }}>
      <h1>My E-Commerce Store</h1>
      <p>Cart Items: {cartItems.length}</p>
      <p>Total Quantity: {totalQty}</p>
    </nav>
  );
}
