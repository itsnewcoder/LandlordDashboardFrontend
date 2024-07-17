import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Property from './Property';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://landlorddashboard.onrender.com/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://landlorddashboard.onrender.com/api/properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert(`Failed to delete property: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="row">
      {properties.map((property) => (
        <Property key={property._id} property={property} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default PropertyList;