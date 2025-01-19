import React, { useState } from 'react';

const PetShelterForm = () => {
  const [petName, setPetName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('petName', petName);
    formData.append('description', description);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }


    console.log('Form submitted');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Upload Image of Pet</h1>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ display: 'block', marginBottom: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="petName" style={{ display: 'block', marginBottom: '5px' }}>
            Name
          </label>
          <input
            id="petName"
            type="text"
            placeholder="Your puppy name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>
            Describe your animal
          </label>
          <textarea
            id="description"
            placeholder="Describe your pet"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }} 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '5px' }}>
            Category
          </label>
          <input
            id="category"
            type="text"
            placeholder="Category (e.g., Dog, Cat)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }} 
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default PetShelterForm;
