import React from 'react';
import { Link } from 'react-router-dom';

function Property({ property, onDelete }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={`https://landlorddashboard.onrender.com${property.image}`} className="card-img-top" alt={property.description} />
        <div className="card-body">
          <p className="card-text">{property.description}</p>
          <p className="card-text">{property.address}</p>
          <p className="card-text">Price: ${property.price}</p>
          <div className="d-flex justify-content-between">
            <Link to={`/edit/${property._id}`} className="btn btn-primary">Update</Link>
            <button onClick={() => onDelete(property._id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;