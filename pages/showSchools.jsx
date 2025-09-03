import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get('/api/getSchools');
        setSchools(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="container my-4">
      <h2>Schools</h2>
      <div className="row">
        {schools.map(s => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={s.id}>
            <div className="card h-100">
              <img
                src={s.image || '/placeholder.png'}
                className="card-img-top"
                alt={s.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{s.name}</h5>
                <p className="card-text small">{s.address}</p>
                <p className="card-text"><small className="text-muted">{s.city}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
