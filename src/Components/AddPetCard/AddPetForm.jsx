import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './AddPetForm.css';

const AddPetForm = ({ onAddPet }) => {
  const navigate = useNavigate(); // ✅ Use navigate properly

  const [formData, setFormData] = useState({
    image: '',
    images: [],
    name: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    healthStatus: '',
    city: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.image) newErrors.image = 'Main image is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.size) newErrors.size = 'Size is required.';
    if (!formData.age) newErrors.age = 'Age is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImagesChange = (e) => {
    const urls = e.target.value.split(',').map(url => url.trim());
    setFormData({ ...formData, images: urls });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // ✅ Add likes: 0 and ID, then call onAddPet
    onAddPet({ ...formData, id: Date.now(), likes: 0 });

    setFormData({
      image: '',
      images: [],
      name: '',
      breed: '',
      age: '',
      gender: '',
      size: '',
      healthStatus: '',
      city: '',
    });
    setErrors({});
    setShowSuccess(true);

    // ✅ Redirect to shelter after short delay
    setTimeout(() => {
      setShowSuccess(false);
      onAddPet({ ...formData, id: Date.now(), likes: 0 });
      navigate('/shelter', { state: { newPet: { ...formData, id: Date.now(), likes: 0 } } });
      
    }, 1000);
  };

  return (
    <>
      <form className="add-pet-form" onSubmit={handleSubmit}>
        <h2>Add a New Pet</h2>

        {/* Image Upload Section */}
        <div className="image-upload-section">
          <label htmlFor="imageUpload" className="image-upload-box">
            <span className="plus-symbol">+</span>
            <span className="upload-text">Upload Image</span>
            <input
              id="imageUpload"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          {errors.image && <p className="error">{errors.image}</p>}
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Breed:</label>
          <input name="breed" value={formData.breed} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input name="age" type="number" value={formData.age} onChange={handleChange} />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="form-group">
          <label>Size:</label>
          <select name="size" value={formData.size} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          {errors.size && <p className="error">{errors.size}</p>}
        </div>

        <div className="form-group">
          <label>Health Status:</label>
          <input name="healthStatus" value={formData.healthStatus} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>City:</label>
          <input name="city" value={formData.city} onChange={handleChange} />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <button type="submit" className="submit-button">Submit Pet</button>
      </form>

      {showSuccess && (
        <div className="success-dialog">
          Pet added successfully!
        </div>
      )}
    </>
  );
};

export default AddPetForm;
