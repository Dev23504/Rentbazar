
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import products from "../data/product";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userProducts = JSON.parse(
    localStorage.getItem("userProducts") || "[]"
  );

  const allProducts = [...products, ...userProducts];

  const product = allProducts.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-700">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            The rental product you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/rentals")}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Rentals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="grid md:grid-cols-2">

            <div className="h-[450px] md:h-[550px] bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x600?text=Image+Not+Found";
                }}
              />
            </div>

            <div className="p-8 md:p-10">

              <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                {product.category}
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 mt-5">

                <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                  <Star size={18} fill="currentColor" />
                  {product.rating || 5}
                </span>

                <span className="flex items-center gap-1 text-gray-500">
                  <MapPin size={18} />
                  {product.location}
                </span>

              </div>

              <p className="text-gray-600 mt-6 leading-7">
                {product.description ||
                  `Rent ${product.title} easily through RentBazar. This product is available for short-term and daily rental. Choose your rental dates and complete the booking securely.`}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-7">

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Category
                  </p>

                  <p className="font-semibold mt-1">
                    {product.category}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="font-semibold mt-1">
                    {product.location}
                  </p>
                </div>

              </div>

              <div className="border-t border-b py-6 my-7">

                <p className="text-gray-500">
                  Rental Price
                </p>

                <div className="flex items-end gap-2 mt-2">

                  <h2 className="text-4xl font-bold text-green-600">
                    ₹{product.price}
                  </h2>

                  <span className="text-gray-500 mb-1">
                    / day
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  navigate(`/rental/${product.id}`)
                }
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-bold transition duration-300 shadow-md hover:shadow-lg"
              >
                Rent Now
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;