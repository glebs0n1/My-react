// src/components/User/Profile/Profile.tsx
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null); // Состояние для данных пользователя

  // Получаем данные пользователя из localStorage (или API)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData) {
      setUser(userData);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <h2>Your Pets</h2>
      <ul>
        {user.pets.map((pet, index) => (
          <li key={index}>
            <strong>{pet.name}</strong> ({pet.species})
          </li>
        ))}
      </ul>

      <h2>Upcoming Appointments</h2>
      <ul>
        {user.appointments.map((appointment, index) => (
          <li key={index}>
            {appointment.date} with {appointment.serviceProvider}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
