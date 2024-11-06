import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from './BackButton.js';

const SignDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 // const [signature, setSignature] = useState('');
  const sigPadRef = useRef({});  // Reference to the signature pad

  const clearSignature = () => {
    sigPadRef.current.clear();  // Clear the signature pad
  };

  const handleSign = async () => {
    const token = localStorage.getItem('token');
    try {
      const signatureBase64 = sigPadRef.current.getTrimmedCanvas().toDataURL('image/png');  // Get base64 image

      await axios.post(`http://localhost:5000/api/documents/sign/${id}`, { signature: signatureBase64 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      navigate('/dashboard');
    } catch (error) {
      alert('Error signing document');
    }
  };

  return (
    <div className="container mt-5"> 
      <BackButton />
      <h2 className="mt-5">Sign Document</h2>

      {/* Signature Pad */}
      <SignaturePad 
        ref={sigPadRef} 
        canvasProps={{ className: 'signatureCanvas', width: 500, height: 200, style: { border: '1px solid #000' } }} 
      />

      <div className="mt-3">
        <button className="btn btn-secondary me-2" onClick={clearSignature}>
          Clear Signature
        </button>
        <button className="btn btn-primary" onClick={handleSign}>
          Sign
        </button>
      </div>
    </div>
  );
};

export default SignDocument;
