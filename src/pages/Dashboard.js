import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from './Logout';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/documents/all-docs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocuments(data.data);
      } catch (error) {
        alert("Error fetching documents");
      }
    };
    fetchDocuments();
  }, []);

  const handleUploadClick = () => {
    navigate("/upload");
  };

  return (
    <div className="container mt-5">
      <Logout />
      <div className="d-flex justify-content-between mb-3 mt-5">
        <h2>Your Documents</h2>
        <button className="btn btn-success" onClick={handleUploadClick}>
          Upload Document
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(documents) && documents.length > 0 ? (
            documents.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.filename}</td>
                <td>{doc.signed ? "Signed" : "Pending"}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() =>
                      navigate(`/sign/${doc._id}`)
                    }
                  >
                    Sign
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      navigate(`/preview/${doc._id}`)
                    }
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-3 shadow-10 ">No documents found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
