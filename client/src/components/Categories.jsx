import React from "react";
import {
  Car,
  Bike,
  Laptop,
  Camera,
  Gamepad2,
  Armchair,
  Wrench,
  Tent,
  Speaker,
  Smartphone,
  PartyPopper,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Cars",
    icon: Car,
    description: "Rent cars for trips, travel and daily needs.",
  },
  {
    name: "Bikes",
    icon: Bike,
    description: "Find bikes and scooters at affordable prices.",
  },
  {
    name: "Laptops",
    icon: Laptop,
    description: "Rent laptops for work, study and projects.",
  },
  {
    name: "Cameras",
    icon: Camera,
    description: "Professional cameras for photos and videos.",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    description: "PlayStation, Xbox, VR and gaming accessories.",
  },
  {
    name: "Furniture",
    icon: Armchair,
    description: "Rent sofas, chairs, tables and more.",
  },
  {
    name: "Tools",
    icon: Wrench,
    description: "Get tools for home and professional work.",
  },
  {
    name: "Camping",
    icon: Tent,
    description: "Everything you need for your next adventure.",
  },
  {
    name: "Speakers",
    icon: Speaker,
    description: "Powerful speakers for parties and events.",
  },
  {
    name: "Mobiles",
    icon: Smartphone,
    description: "Rent smartphones for temporary needs.",
  },
  {
    name: "Event Items",
    icon: PartyPopper,
    description: "DJ systems, projectors, lights and more.",
  },
  {
    name: "Sports",
    icon: Trophy,
    description: "Sports equipment for practice and events.",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <style>{`
        @keyframes heroFade {
          from {
            opacity: 0;
            transform: translateY(-35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardFade {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes ctaFade {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hero-animation {
          animation: heroFade 0.8s ease-out both;
        }

        .category-animation {
          animation: cardFade 0.7s ease-out both;
        }

        .cta-animation {
          animation: ctaFade 0.8s ease-out both;
        }
      `}</style>

      <section className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center hero-animation">
          <p className="text-green-100 font-semibold tracking-widest mb-3">
            RENTBAZAR
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Browse Categories
          </h1>

          <p className="mt-4 text-green-100 text-lg">
            Find exactly what you need and rent it easily.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to={`/rentals?category=${category.name}`}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-green-200 border border-transparent transition-all duration-500 category-animation"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Icon
                    size={32}
                    className="text-green-600 group-hover:text-white group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                <h2 className="text-xl font-bold mt-5 text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  {category.name}
                </h2>

                <p className="text-gray-500 mt-2 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                  {category.description}
                </p>

                <div className="mt-5 text-green-600 font-semibold flex items-center gap-1 group-hover:gap-3 transition-all duration-300">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-6 text-center cta-animation">
          <p className="text-green-500 font-semibold tracking-widest mb-3">
            RENTBAZAR
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Can't find what you're looking for?
          </h2>

          <p className="text-gray-400 mt-3">
            Explore all available rental products on RentBazar.
          </p>

          <Link
            to="/rentals"
            className="inline-flex items-center mt-6 bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95 px-7 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/30"
          >
            Explore Rentals
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Categories;