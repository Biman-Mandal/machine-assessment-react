import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserSlice } from "../services/redux/ProfileReducer";
import { useUpdateUserMutation } from "../services/apis/UserProfile";
import * as XLSX from "xlsx";
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
  const [errors, setErrors] = useState({});

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    const formData = { name, email, phone, pin, address };
    localStorage.setItem("unsavedProfileData", JSON.stringify(formData));
  }, [name, email, phone, pin, address]);

  const saveProfile = async () => {
    try {
      const response = await updateUser({ name, email, phone, pin, address }).unwrap();
      if (response.status === 1) {
        setSuccess("Profile Updated Successfully!");
        setErrors({});
        dispatch(addUserSlice(response.data));
        localStorage.removeItem("unsavedProfileData");
      }
    } catch (error) {
      if (error.data?.status === 0) {
        setErrors(error.data.data);
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      const savedData = localStorage.getItem("unsavedProfileData");
      if (savedData) {
        const { name, email, phone, pin, address } = JSON.parse(savedData);
        setName(name);
        setEmail(email);
        setPhone(phone);
        setPin(pin);
        setAddress(address);
        saveProfile();
      }
    };

    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    try {
      await saveProfile();
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const exportToExcel = () => {
    const data = [
      {
        Name: name,
        Email: email,
        Phone: phone,
        "Pin Code": pin,
        Address: address,
      },
    ];
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profile Data");

    const currentDateTime = new Date()
      .toISOString()
      .replace(/[-:T]/g, "_")
      .split(".")[0];

    XLSX.writeFile(workbook, `profile-data-${currentDateTime}.xlsx`);
  };

  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <h2 className="login-header">Hi, {name}. Update your profile.</h2>
          <button type="button" className="export-button" onClick={exportToExcel}>
            Export to Excel
          </button>
        </div>

        {success && <p className="success-message">{success}</p>}

        <form className="login-form-container" onSubmit={handleSubmit}>
          <div className="login-input-container">
            <label htmlFor="name" className="login-label"><b>Full Name</b></label>
            <input className={`login-input-email ${errors?.name ? "input-error" : ""}`}
              placeholder="Enter Full Name" id="name" value={name}
              onChange={(e) => setName(e.target.value)} />
            {errors?.name && <p className="error-message">{errors.name[0]}</p>}

            <label htmlFor="email" className="login-label"><b>Email</b></label>
            <input className={`login-input-email ${errors?.email ? "input-error" : ""}`}
              placeholder="Enter Email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
            {errors?.email && <p className="error-message">{errors.email[0]}</p>}

            <label htmlFor="phone" className="login-label"><b>Phone</b></label>
            <input className={`login-input-email ${errors?.phone ? "input-error" : ""}`}
              placeholder="Enter Phone Number" type="number" id="phone"
              value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors?.phone && <p className="error-message">{errors.phone[0]}</p>}

            <label htmlFor="pin" className="login-label"><b>Pin Code</b></label>
            <input className="login-input-email" placeholder="Enter Pin Code" id="pin"
              value={pin} onChange={(e) => setPin(e.target.value)} />
            {errors?.pin && <p className="error-message">{errors.pin[0]}</p>}

            <label htmlFor="address" className="login-label"><b>Address</b></label>
            <input className="login-input-email" placeholder="Enter Address" id="address"
              value={address} onChange={(e) => setAddress(e.target.value)} />
            {errors?.address && <p className="error-message">{errors.address[0]}</p>}

            {errors.general && <p className="error-message">{errors.general}</p>}
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Profile;
