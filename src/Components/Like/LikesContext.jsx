import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const LikesContext = createContext(null);

export const LikesProvider = ({ children }) => {
  const { user } = useAuth();
  const email = user?.email;

  const [likedItems, setLikedItems] = useState([]);

  /* ================= LOAD FAVORITES ================= */
  useEffect(() => {
    if (!email) {
      setLikedItems([]);
      return;
    }

    try {
      const savedFavorites = localStorage.getItem(`favorites_${email}`);
      setLikedItems(savedFavorites ? JSON.parse(savedFavorites) : []);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setLikedItems([]);
    }
  }, [email]);

  /* ================= SAVE FAVORITES ================= */
  useEffect(() => {
    if (!email) return;
    localStorage.setItem(`favorites_${email}`, JSON.stringify(likedItems));
    window.dispatchEvent(new Event('likesChanged'));
  }, [likedItems, email]);

  /* ================= ACTIONS ================= */
  const toggleLike = (item) => {
    if (!email) {
      // Dispatch event kad reikia rodyti login toast
      window.dispatchEvent(new CustomEvent('showLoginToast'));
      return;
    }

    setLikedItems((prev) => {
      const exists = prev.some((liked) => liked.id === item.id);
      return exists
        ? prev.filter((liked) => liked.id !== item.id)
        : [...prev, item];
    });
  };

  const isLiked = (id) => likedItems.some((item) => item.id === id);

  const clearAllLikes = () => {
    setLikedItems([]);
    if (email) {
      localStorage.removeItem(`favorites_${email}`);
    }
    window.dispatchEvent(new Event('likesChanged'));
  };

  return (
    <LikesContext.Provider
      value={{
        likedItems,
        toggleLike,
        isLiked,
        clearAllLikes,
        isAuthenticated: !!email,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error("useLikes must be used within a LikesProvider");
  }
  return context;
};