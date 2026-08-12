import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form:", formData);

    alert("Your message has been sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">

      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center animate-[fadeDown_0.8s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold">
            Contact RentBazar
          </h1>

          <p className="mt-4 text-green-100 text-lg max-w-2xl mx-auto animate-[fadeUp_1s_ease-out]">
            Have a question, need help with a rental, or want to list
            your product? We are here to help.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-12">

          <div className="animate-[fadeLeft_0.9s_ease-out]">

            <h2 className="text-3xl font-bold text-gray-900">
              Get in Touch
            </h2>

            <p className="text-gray-600 mt-3 leading-relaxed">
              Whether you're renting something or listing your own item,
              our team is ready to help you with any questions.
            </p>

            <div className="space-y-5 mt-8">

              <div className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-600 transition-all duration-300">
                  <Mail
                    className="text-green-600 group-hover:text-white transition"
                    size={24}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Email Us
                  </h3>

                  <p className="text-gray-500">
                    support@rentbazar.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-600 transition-all duration-300">
                  <Phone
                    className="text-green-600 group-hover:text-white transition"
                    size={24}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Call Us
                  </h3>

                  <p className="text-gray-500">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-600 transition-all duration-300">
                  <MapPin
                    className="text-green-600 group-hover:text-white transition"
                    size={24}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Our Location
                  </h3>

                  <p className="text-gray-500">
                    Indore, Madhya Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-600 transition-all duration-300">
                  <Clock
                    className="text-green-600 group-hover:text-white transition"
                    size={24}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Working Hours
                  </h3>

                  <p className="text-gray-500">
                    Monday - Saturday | 9:00 AM - 7:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 animate-[fadeRight_0.9s_ease-out] hover:shadow-2xl transition-all duration-500">

            <h2 className="text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            <p className="text-gray-500 mt-2">
              Fill out the form and we'll get back to you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              <div className="animate-[fadeUp_0.8s_ease-out]">
                <label className="block text-sm font-semibold mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                />
              </div>

              <div className="animate-[fadeUp_0.9s_ease-out]">
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                />
              </div>

              <div className="animate-[fadeUp_1s_ease-out]">
                <label className="block text-sm font-semibold mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                />
              </div>

              <div className="animate-[fadeUp_1.1s_ease-out]">
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 hover:-translate-y-1 active:scale-95 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Send
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

      <section className="bg-gray-900 text-white py-14 animate-[fadeUp_1s_ease-out]">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-3xl font-bold">
            Need something? Rent it on RentBazar.
          </h2>

          <p className="text-gray-400 mt-3">
            Find cars, bikes, laptops, cameras, gaming gear and much more.
          </p>

        </div>
      </section>

      <style>{`
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

    </div>
  );
};

export default Contact;