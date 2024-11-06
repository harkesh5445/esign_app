import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton.js";

const PreviewDocument = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/documents/preview/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocument(data.data);
      } catch (error) {
        alert("Error fetching document");
      }
    };
    fetchDocument();
  }, [id]);

  return (
    <div className="container mt-5">
      <BackButton />
      <h2 className="text-center">Preview Document</h2>
      {document && (
        <div className="d-flex justify-content-center align-items-center">
          {/* Document Preview */}
          <div className="d-flex flex-column align-items-center">
            <iframe
              src={document.fileUrl}
              width="600"
              height="500"
              title="PDF Viewer"
            />
            <p className="m-3">{document.filename}</p>
            <a className="btn btn-primary m-5" href={document.fileUrl} download>
              Download
            </a>
          </div>

          {/* Signature Preview */}
          {document.signature && (
            <div className="d-flex flex-column align-items-center m-3">
              <h5>Signature:</h5>
              <img
                src={document.signature}
                alt="Document Signature"
                width="200"
                height="200"
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PreviewDocument;
