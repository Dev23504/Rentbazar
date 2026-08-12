import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400">
              RentBazar
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed">
              Rent anything you need from trusted owners at affordable prices.
              Easy, secure and convenient rental experience.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-3 text-slate-400">
              <Link
                to="/"
                className="block hover:text-emerald-400 transition"
              >
                Home
              </Link>
              <Link
                to="/rentals"
                className="block hover:text-emerald-400 transition"
              >
                Rentals
              </Link>
              <Link
                to="/about"
                className="block hover:text-emerald-400 transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block hover:text-emerald-400 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="space-y-3 text-slate-400">
              <p>Cars & Bikes</p>
              <p>Electronics</p>
              <p>Gaming</p>
              <p>Furniture</p>
              <p>Camping</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-slate-400">
              <p>📍 Indore, Madhya Pradesh</p>
              <p>📞 +91 9876543210</p>
              <p>✉️ support@rentbazar.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} RentBazar. All rights reserved.
          </p>

          <div className="flex gap-5 text-sm text-slate-400">
            <span className="hover:text-emerald-400 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-emerald-400 cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;