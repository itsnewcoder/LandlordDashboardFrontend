import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function PropertyForm() {
  const [property, setProperty] = useState({
    description: '',
    address: '',
    price: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log('PropertyForm mounted');
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`https://landlorddashboard.onrender.com/api/properties/${id}`);
      setProperty(response.data);
      setPreviewImage(response.data.image);
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
    console.log('PropertyForm mounted');
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProperty({ ...property, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    const formData = new FormData();
    formData.append('description', property.description);
    formData.append('address', property.address);
    formData.append('price', property.price);
    if (property.image instanceof File) {
      formData.append('image', property.image);
    }

    try {
      console.log('Submitting property:', property);
      if (id) {
        const response = await axios.put(`https://landlorddashboard.onrender.com/api/properties/${id}`, formData);
        console.log('Updated property:', response.data);
      } else {
        const response = await axios.post('https://landlorddashboard.onrender.com/api/properties', formData);
        console.log('Added new property:', response.data);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={property.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={property.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={property.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image</label>
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      {previewImage && (
        <div className="mb-3">
          <img src={previewImage} alt="Preview" style={{ maxWidth: '200px' }} />
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        {id ? 'Update' : 'Add'} Property
      </button>
    </form>
  );
}

export default PropertyForm;