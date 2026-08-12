import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    location: "",
    description: "",
    image: "",
    owner: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOwnerChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      owner: {
        ...prev.owner,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingProducts = JSON.parse(
      localStorage.getItem("userProducts") || "[]"
    );

    const newProduct = {
      id: Date.now(),
      title: product.title,
      category: product.category,
      price: Number(product.price),
      location: product.location,
      rating: 5,
      image: product.image,
      description: product.description,
      owner: {
        name: product.owner.name,
        phone: product.owner.phone,
        email: product.owner.email,
      },
    };

    const updatedProducts = [...existingProducts, newProduct];

    localStorage.setItem(
      "userProducts",
      JSON.stringify(updatedProducts)
    );

    alert("Product Added Successfully!");

    setProduct({
      title: "",
      category: "",
      price: "",
      location: "",
      description: "",
      image: "",
      owner: {
        name: "",
        phone: "",
        email: "",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Product Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold">
                  Product Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  placeholder="Enter Product Name"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Category
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Cars">Cars</option>
                  <option value="Bikes">Bikes</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Cameras">Cameras</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Tools">Tools</option>
                  <option value="Camping">Camping</option>
                  <option value="Speakers">Speakers</option>
                  <option value="Mobiles">Mobiles</option>
                  <option value="Event Items">Event Items</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Rent Price (Per Day)
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  min="1"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={product.location}
                  onChange={handleChange}
                  placeholder="Enter Location"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  placeholder="Paste Image URL"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="4"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter Product Description"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Owner Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold">
                  Owner Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={product.owner.name}
                  onChange={handleOwnerChange}
                  placeholder="Enter Owner Name"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Owner Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={product.owner.phone}
                  onChange={handleOwnerChange}
                  placeholder="Enter Phone Number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Owner Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={product.owner.email}
                  onChange={handleOwnerChange}
                  placeholder="Enter Email"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
