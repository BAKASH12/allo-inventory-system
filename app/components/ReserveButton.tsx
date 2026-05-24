"use client";

import { useState } from "react";

export default function ReserveButton({
  product,
  warehouse,
}: {
  product: string;
  warehouse: string;
}) {
  const [loading, setLoading] =
    useState(false);

  async function reserveProduct() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productName: product,
            warehouseName: warehouse,
            quantity: 1,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Reservation successful!");

      window.location.reload();
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={reserveProduct}
      disabled={loading}
      className="bg-black text-white px-4 py-2 rounded mt-4"
    >
      {loading
        ? "Reserving..."
        : "Reserve"}
    </button>
  );
}