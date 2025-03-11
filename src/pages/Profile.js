import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserSlice } from "../services/redux/ProfileReducer";
import { useUpdateUserMutation } from "../services/apis/UserProfile";
import "../components/auth/Login.css";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile.userSliceData);

  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [pin, setPin] = useState(userData.pin || "");
  const [address, setAddress] = useState(userData.address || "");

  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({}); // Stores field-wise errors

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Email validation function
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // Reset previous errors

    if (!isEmailValid(email)) {
      setErrors({ email: "Invalid email format." });
      setSuccess("");
      return;
    }

    try {
      const response = await updateUser({ name, email, phone, pin, address }).unwrap();

      if (response.status === 1) {
        setSuccess("Profile Updated Successfully!");
        setErrors({});
        dispatch(addUserSlice(response.data)); // Update Redux state
      }
    } catch (error) {
      if (error.data?.status === 0) {
        setErrors(error.data.data); // Set field-wise validation errors
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    }
  };

  return (
    <div>
      <h2 className="login-header">Hi, {name}. Update your profile.</h2>
      {success && <p className="success-message">{success}</p>}

      <form className="login-form-container" onSubmit={handleSubmit}>
        <div className="login-input-container">
          {/* Full Name */}
          <label htmlFor="name" className="login-label">
            <b>Full Name</b>
          </label>
          <input
            className={`login-input-email ${errors?.name ? "input-error" : ""}`}
            placeholder="Enter Full Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors?.name && <p className="error-message">{errors.name[0]}</p>}

          {/* Email */}
          <label htmlFor="email" className="login-label">
            <b>Email</b>
          </label>
          <input
            className={`login-input-email ${errors?.email ? "input-error" : ""}`}
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors?.email && <p className="error-message">{errors.email[0]}</p>}

          {/* Phone */}
          <label htmlFor="phone" className="login-label">
            <b>Phone</b>
          </label>
          <input
            className={`login-input-email ${errors?.phone ? "input-error" : ""}`}
            placeholder="Enter Phone Number"
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors?.phone && <p className="error-message">{errors.phone[0]}</p>}

          {/* Pin Code */}
          <label htmlFor="pin" className="login-label">
            <b>Pin Code</b>
          </label>
          <input
            className="login-input-email"
            placeholder="Enter Pin Code"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          {errors?.pin && <p className="error-message">{errors.pin[0]}</p>}

          {/* Address */}
          <label htmlFor="address" className="login-label">
            <b>Address</b>
          </label>
          <input
            className="login-input-email"
            placeholder="Enter Address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors?.address && <p className="error-message">{errors.address[0]}</p>}

          {errors.general && <p className="error-message">{errors.general}</p>}
          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
