
import { useCallback, useEffect, useState } from "react";
import { Package, RefreshCw, Trash2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "https://rentbazar-backend.onrender.com";
const PRODUCT_API = `${API}/api/products`;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(PRODUCT_API, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load products");
      }

      setProducts(
        Array.isArray(data) ? data : data.products || data.items || []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  async function deleteProduct(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`${PRODUCT_API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete product");
      }

      setProducts((old) =>
        old.filter((product) => product._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          </div>
          <p className="mt-2 text-slate-500">
            View and manage RentBazar listings.
          </p>
        </div>

        <button
          onClick={loadProducts}
          className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 font-medium"
        >
          <RefreshCw size={17} /> Refresh
        </button>
      </div>

      {error && (
        <div className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="py-12 text-center text-slate-500">Loading products...</p>
      ) : (
        <div className="mt-7 overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {(product.image || product.imageUrl) && (
                        <img
                          src={product.image || product.imageUrl}
                          alt={product.name || product.title || "Product"}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      )}
                      <span className="font-medium text-slate-800">
                        {product.name || product.title || "Unnamed product"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">{product.category || "—"}</td>
                  <td className="p-4">
                    ₹{product.pricePerDay ?? product.price ?? "—"}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 font-medium text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
