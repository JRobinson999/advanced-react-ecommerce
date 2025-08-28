import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import {
  fetchCategories,
  fetchProductsByCategory,
  fetchAllProducts,
} from "../api/product";

const fallbackImg = "https://via.placeholder.com/200?text=No+Image";

export default function Products() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("all");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () =>
      category === "all"
        ? fetchAllProducts()
        : fetchProductsByCategory(category),
  });

  if (isLoading) return <p style={{ padding: 16 }}>Loading products…</p>;
  if (isError)
    return (
      <p style={{ padding: 16, color: "tomato" }}>Error loading products.</p>
    );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="cat">Category: </label>
        <select
          id="cat"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((p) => (
          <article
            key={p.id}
            style={{
              background: "#1f2937",
              color: "white",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{
                width: "100%",
                height: 180,
                objectFit: "contain",
                background: "white",
              }}
              onError={(e) => (e.currentTarget.src = fallbackImg)}
            />
            <h3 style={{ fontSize: 16, marginTop: 8 }}>{p.title}</h3>
            <p style={{ opacity: 0.85, minHeight: 40 }}>{p.category}</p>
            <p style={{ fontWeight: "bold" }}>${p.price}</p>

            <p style={{ fontSize: 12, opacity: 0.8 }}>
              Rating: {p.rating?.rate ?? "N/A"} ({p.rating?.count ?? 0})
            </p>

            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    image: p.image,
                  })
                )
              }
              style={{ marginTop: 8 }}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
