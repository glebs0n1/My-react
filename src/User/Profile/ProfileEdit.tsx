import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import CityAutocomplete from "../../Components/Search/CityAutocomplete";

/* ================= INPUT FIELD COMPONENT ================= */
type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: string;
  readOnly?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  readOnly = false,
}) => (
  <div>
    <label className="block text-sm font-semibold mb-2 text-gray-700">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        readOnly={readOnly}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
          readOnly ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "border-gray-300"
        }`}
      />
    )}
  </div>
);

/* ================= MAIN PROFILE EDIT PAGE ================= */
const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    bio: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  /* ---------- Load existing user data ---------- */
  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(" ") || [];
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts[1] || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  /* ---------- Handle form change ---------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ---------- Handle save ---------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      const res = await fetch(`http://localhost:18090/api/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          bio: formData.bio,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update profile");
      }

      const updatedUser = await res.json();

      // Update localStorage with new user data
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        const newUserData = {
          ...currentUser,
          name: fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          bio: formData.bio,
        };
        localStorage.setItem("user", JSON.stringify(newUserData));
      }

      toast.success("Profile updated successfully!");
      
      // Reload page to refresh AuthContext
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
      
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => navigate("/profile");

  const email = user?.email ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 py-12 px-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/profile");
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 focus:outline-none"
          >
            ← Back to Profile
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Profile</h1>
          <p className="text-gray-600">Update your personal information</p>
        </div>
        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>

            {/* AVATAR */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-4">Profile Picture</p>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white font-bold flex items-center justify-center text-3xl shadow-lg">
                  {email.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                  >
                    Change Avatar
                  </button>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max 5MB</p>
                </div>
              </div>
            </div>

            {/* PERSONAL INFO */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <InputField label="Email" name="email" value={email} onChange={handleChange} readOnly />
                <InputField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6">Address</h2>
              <InputField
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    City
                  </label>
                  <CityAutocomplete
                    name="city"
                    value={formData.city}
                    onChange={(v) =>
                      setFormData((prev) => ({ ...prev, city: v }))
                    }
                    placeholder="Start typing… e.g. Vilnius"
                    inputClassName="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>
                <InputField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* BIO */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6">About</h2>
              <InputField
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                type="textarea"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;