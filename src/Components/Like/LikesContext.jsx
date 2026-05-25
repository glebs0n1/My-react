import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";

const LikesContext = createContext(null);

export const LikesProvider = ({ children }) => {
  const { user } = useAuth();
  const email = user?.email;

  const [likedItems, setLikedItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  /* ================= LOAD FAVORITES ================= */
  useEffect(() => {
    if (!email) {
      setLikedItems([]);
      setIsInitialized(false);
      return;
    }

    try {
      const savedFavorites = localStorage.getItem(`favorites_${email}`);
      setLikedItems(savedFavorites ? JSON.parse(savedFavorites) : []);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setLikedItems([]);
    }
    setIsInitialized(true);
  }, [email]);

  /* ================= SAVE FAVORITES ================= */
  useEffect(() => {
    if (!email || !isInitialized) return;
    localStorage.setItem(`favorites_${email}`, JSON.stringify(likedItems));
    window.dispatchEvent(new Event('likesChanged'));
  }, [likedItems, email, isInitialized]);

  /* ================= ACTIONS ================= */
  const toggleLike = useCallback((item) => {
    if (!email) {
      window.dispatchEvent(new CustomEvent("showLoginToast"));
      return;
    }

    setLikedItems((prev) => {
      const exists = prev.some((liked) => liked.id === item.id);
      return exists
        ? prev.filter((liked) => liked.id !== item.id)
        : [...prev, item];
    });
  }, [email]);

  const isLiked = useCallback(
    (id) => likedItems.some((item) => item.id === id),
    [likedItems]
  );

  const clearAllLikes = useCallback(() => {
    setLikedItems([]);
    if (email) {
      localStorage.removeItem(`favorites_${email}`);
    }
    window.dispatchEvent(new Event("likesChanged"));
  }, [email]);

  const contextValue = useMemo(
    () => ({
      likedItems,
      toggleLike,
      isLiked,
      clearAllLikes,
      isAuthenticated: !!email,
    }),
    [likedItems, toggleLike, isLiked, clearAllLikes, email]
  );

  return (
    <LikesContext.Provider value={contextValue}>
      {children}
    </LikesContext.Provider>
  );
};

LikesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error("useLikes must be used within a LikesProvider");
  }
  return context;
};