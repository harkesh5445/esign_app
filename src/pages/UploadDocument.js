import React, { useState } from "react";
import axios from "axios";
import BackButton from "./BackButton.js";
import { useNavigate } from "react-router-dom";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/documents/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      alert("Error uploading document");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <BackButton />
      </div>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <form className="w-50" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Upload Document</h2>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              accept=".pdf,.docx"
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadDocument;
