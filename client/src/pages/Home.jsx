import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/image/hero.jpg";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/rentals?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/rentals");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-50 via-white to-green-100 min-h-[90vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">

        <div className="animate-[fadeInLeft_0.8s_ease-out]">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium animate-pulse">
            🚀 India's Trusted Rental Marketplace
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold mt-6 leading-tight">
            Rent Anything,
            <span className="text-green-600 inline-block ml-2 animate-[fadeIn_1s_ease-out]">
              Anytime.
            </span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg animate-[fadeIn_1.2s_ease-out]">
            Find bikes, cameras, laptops, furniture, sports equipment,
            tools and much more from people near you.
          </p>

          <div className="mt-8 flex bg-white rounded-xl shadow-lg overflow-hidden max-w-xl border border-transparent focus-within:border-green-400 focus-within:shadow-green-200 transition-all duration-300 hover:shadow-xl animate-[fadeInUp_0.9s_ease-out]">
            <input
              type="text"
              placeholder="What do you want to rent?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-5 py-4 outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-8 flex items-center gap-2 transition-all duration-300"
            >
              <Search
                size={20}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              Search
            </button>
          </div>

          <div className="flex gap-10 mt-10 animate-[fadeInUp_1.1s_ease-out]">
            <div className="hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <h2 className="text-3xl font-bold text-green-600">10K+</h2>
              <p className="text-gray-500">Products</p>
            </div>

            <div className="hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <h2 className="text-3xl font-bold text-green-600">5K+</h2>
              <p className="text-gray-500">Users</p>
            </div>

            <div className="hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <h2 className="text-3xl font-bold text-green-600">120+</h2>
              <p className="text-gray-500">Cities</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center animate-[float_4s_ease-in-out_infinite]">
          <div className="bg-white/60 backdrop-blur-md rounded-[30px] p-6 shadow-2xl border border-green-100 hover:shadow-green-200 transition-all duration-500">
            <img
              src={heroImage}
              alt="RentBazar"
              className="w-full max-w-3xl object-contain hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  );
};

export default Home;
