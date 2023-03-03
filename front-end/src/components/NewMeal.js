import React, { useState } from "react";
import axios from "axios";

export default function NewMeal({name, desc, location, allergens}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("location", location);
    formData.append("allergens", allergens);
    formData.append("thumbnail", selectedFile);
    try {
      const response = await axios.post("http://localhost:8080/dishes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target);
    console.log(event.target.files[0]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect} />
      <input type="submit" value="Upload File" />
    </form>
  );
}