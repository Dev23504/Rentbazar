import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Edit3, Save, ArrowLeft } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
    address: storedUser?.address || "",
    avatar: storedUser?.avatar || "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  if (!storedUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-6">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <User
            size={60}
            className="mx-auto text-green-600 mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-800">
            Please Login
          </h2>

          <p className="text-gray-500 mt-2">
            You need to login to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 font-medium transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-emerald-500 px-8 py-10 text-white">

            <div className="flex flex-col md:flex-row items-center gap-6">

              {/* Avatar */}
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-white text-green-600 flex items-center justify-center text-5xl font-bold border-4 border-white shadow-lg">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}

              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">
                  {user.name || "User"}
                </h1>

                <p className="text-green-100 mt-1">
                  {user.email}
                </p>

                <p className="text-green-100 mt-2">
                  RentBazar Member
                </p>
              </div>

            </div>
          </div>

          {/* Profile Body */}
          <div className="p-8">

            <div className="flex justify-between items-center mb-7">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Personal Information
                </h2>

                <p className="text-gray-500 mt-1">
                  Manage your RentBazar profile
                </p>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                >
                  <Edit3 size={18} />
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                >
                  <Save size={18} />
                  Save
                </button>
              )}

            </div>

            {/* Name */}
            <div className="mb-5">

              <label className="font-semibold text-gray-700">
                Full Name
              </label>

              <div className="relative mt-2">

                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition ${
                    isEditing
                      ? "focus:ring-2 focus:ring-green-500"
                      : "bg-gray-50 text-gray-600"
                  }`}
                />

              </div>
            </div>

            {/* Email */}
            <div className="mb-5">

              <label className="font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative mt-2">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition ${
                    isEditing
                      ? "focus:ring-2 focus:ring-green-500"
                      : "bg-gray-50 text-gray-600"
                  }`}
                />

              </div>
            </div>

            {/* Phone */}
            <div className="mb-5">

              <label className="font-semibold text-gray-700">
                Mobile Number
              </label>

              <div className="relative mt-2">

                <Phone
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter mobile number"
                  maxLength="10"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition ${
                    isEditing
                      ? "focus:ring-2 focus:ring-green-500"
                      : "bg-gray-50 text-gray-600"
                  }`}
                />

              </div>
            </div>

            {/* Address */}
            <div className="mb-5">

              <label className="font-semibold text-gray-700">
                Address
              </label>

              <div className="relative mt-2">

                <MapPin
                  size={19}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <textarea
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your address"
                  rows="3"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none resize-none transition ${
                    isEditing
                      ? "focus:ring-2 focus:ring-green-500"
                      : "bg-gray-50 text-gray-600"
                  }`}
                />

              </div>
            </div>

            {/* Account Info */}
            <div className="border-t pt-7 mt-7">

              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Account
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-green-50 rounded-xl p-5">
                  <p className="text-sm text-gray-500">
                    Account Type
                  </p>

                  <p className="font-bold text-green-700 mt-1">
                    RentBazar User
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-5">
                  <p className="text-sm text-gray-500">
                    Account Status
                  </p>

                  <p className="font-bold text-green-700 mt-1">
                    Active
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;