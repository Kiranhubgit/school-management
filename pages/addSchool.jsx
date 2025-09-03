import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      fd.append('name', data.name);
      fd.append('address', data.address);
      fd.append('city', data.city);
      fd.append('state', data.state);
      fd.append('contact', data.contact);
      fd.append('email_id', data.email_id);

      if (data.image && data.image[0]) fd.append('image', data.image[0]);

      const resp = await axios.post('/api/addSchool', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (resp.data.success) {
        alert('School added successfully!');
        reset();
      } else {
        alert('Error: ' + JSON.stringify(resp.data));
      }
    } catch (err) {
      console.error(err);
      alert('Submit failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container my-4">
      <h2 class="Heading">Add School</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" {...register('name', { required: 'Name is required' })} />
          <small className="text-danger">{errors.name?.message}</small>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea className="form-control" {...register('address', { required: 'Address is required' })} />
          <small className="text-danger">{errors.address?.message}</small>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input className="form-control" {...register('city', { required: 'City required' })} />
            <small className="text-danger">{errors.city?.message}</small>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">State</label>
            <input className="form-control" {...register('state', { required: 'State required' })} />
            <small className="text-danger">{errors.state?.message}</small>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input className="form-control" {...register('contact', {
            required: 'Contact required',
            pattern: { value: /^[0-9]{7,15}$/, message: 'Invalid phone number' }
          })} />
          <small className="text-danger">{errors.contact?.message}</small>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" {...register('email_id', {
            required: 'Email required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
          })} />
          <small className="text-danger">{errors.email_id?.message}</small>
        </div>

        <div className="mb-3">
          <label className="form-label">School Image</label>
          <input className="form-control" type="file" accept="image/*" {...register('image', { required: true })} />
          <small className="text-danger">{errors.image && 'Image is required'}</small>
        </div>

        <button className="btn btn-primary" type="submit">Add School</button>
      </form>
    </div>
  );
}
