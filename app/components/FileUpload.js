import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [responseText, setResponseText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseText(response.data.text);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload and Generate Text</button>
      </form>
      {responseText && <div><h3>Generated Text:</h3><p>{responseText}</p></div>}
    </div>
  );
};

export default FileUpload;
