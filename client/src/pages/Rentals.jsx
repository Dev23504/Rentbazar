import { Search, MapPin, Star, ArrowRight } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import products from "../data/product";

const categories = [
  "Cars",
  "Bikes",
  "Laptops",
  "Cameras",
  "Gaming",
  "Furniture",
  "Tools",
  "Camping",
  "Speakers",
  "Mobiles",
  "Event Items",
  "Sports",
];

const Rentals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";

  const userProducts = JSON.parse(
    localStorage.getItem("userProducts") || "[]"
  );

  const allProducts = [...products, ...userProducts];

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value.trim()) {
      setSearchParams({
        search: value,
      });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = allProducts.filter((product) => {
    const searchMatch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch =
      !selectedCategory ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    return searchMatch && categoryMatch;
  });

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden">
      <style>{`
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(-35px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(35px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseSoft {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        .animate-fade-down {
          animation: fadeDown 0.7s ease-out both;
        }

        .animate-fade-up {
          animation: fadeUp 0.7s ease-out both;
        }

        .animate-fade-left {
          animation: fadeLeft 0.7s ease-out both;
        }

        .animate-fade-right {
          animation: fadeRight 0.7s ease-out both;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out both;
        }

        .animate-pulse-soft {
          animation: pulseSoft 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-fade-left">
            <p className="text-green-100 font-semibold mb-2 tracking-wider">
              RENTBAZAR
            </p>

            <h1 className="text-4xl md:text-5xl font-bold">
              Explore Rentals
            </h1>

            <p className="mt-3 text-lg text-green-100">
              Find cars, bikes, laptops, cameras and more.
            </p>
          </div>

          <div className="mt-8 bg-white rounded-2xl flex items-center overflow-hidden max-w-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-fade-up">
            <Search
              size={22}
              className="text-gray-500 ml-5 transition-transform duration-300"
            />

            <input
              type="text"
              placeholder="Search Cars, Bikes, Laptops..."
              value={searchQuery}
              onChange={handleSearch}
              className="flex-1 px-4 py-4 outline-none text-black"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {searchQuery && (
          <div className="animate-fade-up">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                Search Results
              </h2>

              <span className="text-gray-500">
                {filteredProducts.length} products
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((item, index) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    navigate={navigate}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-scale-in">
                <div className="text-6xl mb-5 animate-pulse-soft">
                  😕
                </div>

                <h2 className="text-3xl font-bold text-gray-700">
                  No Products Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try Cars, Bikes, Laptops or Cameras.
                </p>
              </div>
            )}
          </div>
        )}

        {!searchQuery && selectedCategory && (
          <div className="animate-fade-up">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-green-600 font-semibold">
                  RENTALS
                </p>

                <h2 className="text-3xl font-bold">
                  {selectedCategory}
                </h2>
              </div>

              <button
                onClick={() => setSearchParams({})}
                className="text-green-600 font-semibold hover:underline transition-all duration-300 hover:translate-x-1"
              >
                Show All
              </button>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((item, index) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    navigate={navigate}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-scale-in">
                <div className="text-6xl mb-5 animate-pulse-soft">
                  😕
                </div>

                <h2 className="text-3xl font-bold text-gray-700">
                  No Products Found
                </h2>

                <p className="text-gray-500 mt-2">
                  No products available in this category.
                </p>
              </div>
            )}
          </div>
        )}

        {!searchQuery && !selectedCategory && (
          <>
            {categories.map((category, categoryIndex) => {
              const categoryProducts = allProducts.filter(
                (product) =>
                  product.category.toLowerCase() ===
                  category.toLowerCase()
              );

              return (
                <div
                  key={category}
                  className="mb-14 animate-fade-up"
                  style={{
                    animationDelay: `${categoryIndex * 80}ms`,
                  }}
                >
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold transition-colors duration-300 hover:text-green-600">
                        {category}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        {categoryProducts.length} rental items
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setSearchParams({
                          category: category,
                        })
                      }
                      className="text-green-600 font-semibold hover:underline flex items-center gap-1 transition-all duration-300 hover:translate-x-1"
                    >
                      View All
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryProducts.map((item, index) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        navigate={navigate}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ item, navigate, index = 0 }) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative h-52 overflow-hidden bg-gray-200">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/800x500?text=Image+Not+Found";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-green-700 text-xs font-bold shadow transition-all duration-300 group-hover:scale-105">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-green-600">
          {item.title}
        </h3>

        <p className="text-gray-500 mt-2 flex items-center gap-1 text-sm">
          <MapPin
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
          {item.location}
        </p>

        <div className="flex items-center gap-1 mt-2">
          <Star
            size={16}
            className="text-yellow-500 transition-transform duration-300 group-hover:rotate-12"
            fill="currentColor"
          />

          <span className="text-sm font-semibold">
            {item.rating || 5}
          </span>

          <span className="text-gray-400 text-sm">
            / 5
          </span>
        </div>

        <div className="flex justify-between items-center mt-5">
          <div>
            <p className="text-gray-400 text-xs">
              Starting from
            </p>

            <h4 className="text-green-600 text-2xl font-bold">
              ₹{item.price}

              <span className="text-sm text-gray-500 font-normal">
                {" "}
                /day
              </span>
            </h4>
          </div>

          <button
            onClick={() =>
              navigate(`/product/${item.id}`)
            }
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-lg hover:shadow-green-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rentals;