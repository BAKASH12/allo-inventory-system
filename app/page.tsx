import ReserveButton from "./components/ReserveButton";

async function getProducts() {
  const res = await fetch(
    "http://localhost:3000/api/products",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Inventory System
      </h1>

      <div className="space-y-5">
        {products.map((item: any) => (
          <div
            key={item.id}
            className="border p-5 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold">
              {item.product}
            </h2>

            <p className="mt-2">
              Warehouse: {item.warehouse}
            </p>

            <p>
              Total Stock: {item.totalStock}
            </p>

            <p>
              Reserved Stock: {item.reservedStock}
            </p>

            <p className="font-bold text-green-600">
              Available Stock:
              {" "}
              {item.availableStock}
            </p>

            <ReserveButton
              product={item.product}
              warehouse={item.warehouse}
            />
          </div>
        ))}
      </div>
    </div>
  );
}