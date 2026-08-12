import { ShieldCheck, Wallet, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="bg-gray-50 overflow-hidden">

      <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center scroll-reveal fade-down">
          <p className="text-green-100 font-semibold tracking-widest mb-3">
            RENTBAZAR
          </p>

          <h1 className="text-5xl md:text-6xl font-bold">
            About RentBazar
          </h1>

          <p className="mt-6 text-lg max-w-3xl mx-auto text-green-100 leading-8">
            RentBazar is a peer-to-peer rental marketplace where people can
            rent and lend everyday items safely, affordably, and conveniently.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

        <div className="scroll-reveal fade-left">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
            alt="About RentBazar"
            className="rounded-3xl shadow-xl w-full hover:scale-105 transition duration-700"
          />
        </div>

        <div className="scroll-reveal fade-right">
          <p className="text-green-600 font-semibold mb-3">
            OUR STORY
          </p>

          <h2 className="text-4xl font-bold text-gray-800">
            Rent More. Buy Less.
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            We believe many products remain unused most of the time. RentBazar
            helps people earn from their unused items while giving renters
            affordable access without buying expensive products.
          </p>

          <p className="mt-4 text-gray-600 leading-8">
            From electronics and bikes to cameras, tools, sports equipment,
            and furniture, everything is available on one trusted platform.
          </p>

          <Link
            to="/rentals"
            className="inline-block mt-8 bg-green-600 hover:bg-green-700 hover:-translate-y-1 text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Explore Rentals
          </Link>
        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="text-center scroll-reveal fade-up">
          <p className="text-green-600 font-semibold">
            WHY RENTBAZAR
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            Why Choose RentBazar?
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Everything you need for a simple, affordable and trusted rental
            experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          <div className="scroll-reveal card-delay-1 bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-100 flex items-center justify-center hover:bg-green-600 transition duration-300 group">
              <ShieldCheck
                className="text-green-600 hover:text-white transition"
                size={50}
              />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Safe & Secure
            </h3>

            <p className="mt-3 text-gray-600">
              Verified users and secure booking process.
            </p>
          </div>

          <div className="scroll-reveal card-delay-2 bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-100 flex items-center justify-center">
              <Wallet
                className="text-green-600"
                size={50}
              />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Save Money
            </h3>

            <p className="mt-3 text-gray-600">
              Rent what you need instead of buying.
            </p>
          </div>

          <div className="scroll-reveal card-delay-3 bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-100 flex items-center justify-center">
              <Users
                className="text-green-600"
                size={50}
              />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Community
            </h3>

            <p className="mt-3 text-gray-600">
              Connect with trusted owners near you.
            </p>
          </div>

          <div className="scroll-reveal card-delay-4 bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-100 flex items-center justify-center">
              <Star
                className="text-green-600"
                size={50}
              />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Top Rated
            </h3>

            <p className="mt-3 text-gray-600">
              Thousands of happy renters across India.
            </p>
          </div>

        </div>
      </section>

      <section className="bg-green-600 text-white py-16">

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center gap-8">

          <div className="scroll-reveal stat-animation">
            <h2 className="text-4xl font-bold">
              10K+
            </h2>
            <p className="mt-2">
              Products
            </p>
          </div>

          <div className="scroll-reveal stat-animation delay-1">
            <h2 className="text-4xl font-bold">
              5K+
            </h2>
            <p className="mt-2">
              Happy Users
            </p>
          </div>

          <div className="scroll-reveal stat-animation delay-2">
            <h2 className="text-4xl font-bold">
              500+
            </h2>
            <p className="mt-2">
              Daily Rentals
            </p>
          </div>

          <div className="scroll-reveal stat-animation delay-3">
            <h2 className="text-4xl font-bold">
              120+
            </h2>
            <p className="mt-2">
              Cities
            </p>
          </div>

        </div>
      </section>

      <style>{`
        .scroll-reveal {
          opacity: 0;
          transition: all 0.9s ease-out;
        }

        .fade-up {
          transform: translateY(60px);
        }

        .fade-down {
          transform: translateY(-60px);
        }

        .fade-left {
          transform: translateX(-80px);
        }

        .fade-right {
          transform: translateX(80px);
        }

        .stat-animation {
          transform: translateY(40px) scale(0.9);
        }

        .scroll-reveal.show {
          opacity: 1;
          transform: translate(0) scale(1);
        }

        .card-delay-1 {
          transition-delay: 0.1s;
          transform: translateY(60px);
        }

        .card-delay-2 {
          transition-delay: 0.2s;
          transform: translateY(60px);
        }

        .card-delay-3 {
          transition-delay: 0.3s;
          transform: translateY(60px);
        }

        .card-delay-4 {
          transition-delay: 0.4s;
          transform: translateY(60px);
        }

        .delay-1 {
          transition-delay: 0.1s;
        }

        .delay-2 {
          transition-delay: 0.2s;
        }

        .delay-3 {
          transition-delay: 0.3s;
        }
      `}</style>

    </div>
  );
};

export default About;