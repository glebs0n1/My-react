import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { 
  Heart, 
  Calendar, 
  Settings, 
  LogOut, 
  Edit, 
  Mail, 
  Shield,
  Phone,
  Home,
  MapPin
} from "lucide-react";

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Get favorites count from localStorage (sync with LikesContext)
  const [favoritesCount, setFavoritesCount] = React.useState(0);

  // Update count on mount and when storage changes
  React.useEffect(() => {
    const updateFavoritesCount = () => {
      if (!user?.email) {
        setFavoritesCount(0);
        return;
      }

      try {
        const key = `favorites_${user.email}`;
        const stored = localStorage.getItem(key);
        
        if (stored) {
          const items = JSON.parse(stored);
          setFavoritesCount(Array.isArray(items) ? items.length : 0);
        } else {
          setFavoritesCount(0);
        }
      } catch (error) {
        console.error("Error reading favorites:", error);
        setFavoritesCount(0);
      }
    };

    updateFavoritesCount();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `favorites_${user?.email}`) {
        updateFavoritesCount();
      }
    };

    // Listen for custom event from LikesContext
    const handleLikesChange = () => {
      updateFavoritesCount();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("likesChanged", handleLikesChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("likesChanged", handleLikesChange);
    };
  }, [user?.email]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <p className="text-gray-500 text-lg">Please sign in to view your profile.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  const getInitials = (): string => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* ================= VISIT CARD HEADER ================= */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Purple Header Background */}
          <div className="h-32 bg-gradient-to-r from-purple-100 to-purple-200"></div>
          
          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 gap-6">
              
              {/* Avatar & Name */}
              <div className="flex items-end gap-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white font-bold text-4xl flex items-center justify-center shadow-xl border-4 border-white">
                  {getInitials()}
                </div>
                
                <div className="pb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.name || user.email.split("@")[0]}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Mail size={16} />
                    <p className="text-sm">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 text-purple-600 mt-1">
                    <Shield size={16} />
                    <p className="text-sm font-medium">{user.role}</p>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Link
                to="/profile/edit"
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all hover:scale-105 shadow-lg"
              >
                <Edit size={18} />
                Edit Profile
              </Link>
            </div>

            {/* Bio Section (if exists) */}
            {user.bio && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* ================= CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: My Bookings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-purple-600">
                {user.bookings?.length || 0}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Bookings</h3>
            <p className="text-sm text-gray-500">Active appointments and reservations</p>
            
            {user.bookings && user.bookings.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-600">
                  Latest: {new Date(user.bookings[0].date).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Card 2: My Favorites */}
          <Link 
            to="/favorites"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 block"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <Heart className="text-pink-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-pink-600">
                {favoritesCount}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Favorite Pets</h3>
            <p className="text-sm text-gray-500">Pets you've saved to favorites</p>
            
            {favoritesCount > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-purple-600 hover:underline">
                  View all favorites →
                </span>
              </div>
            )}
          </Link>

          {/* Card 3: Account Status */}
          <Link
            to="/settings"
            className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Settings className="text-green-600" size={24} />
              </div>
              <span className="text-3xl font-bold text-green-600">✓</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Account Status
            </h3>

            <p className="text-sm text-gray-500">
              Your account is active and verified
            </p>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-purple-600">
                Manage settings →
              </span>
            </div>
          </Link>
        </div>

        {/* ================= CONTACT INFORMATION ================= */}
        {(user.address || user.phone || user.email) && (
          <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg p-8 mb-8 border border-purple-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Phone className="text-purple-600" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              {user.email && (
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="text-blue-600" size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Email Address
                    </p>
                    <p className="text-gray-900 font-medium break-all">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {user.phone && (
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="text-green-600" size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Phone Number
                    </p>
                    <p className="text-gray-900 font-medium">{user.phone}</p>
                  </div>
                </div>
              )}

              {/* Address */}
              {user.address && (
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 transition-colors md:col-span-2">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Home className="text-orange-600" size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Address
                    </p>
                    <p className="text-gray-900 font-medium">
                      {user.address}
                      {user.city && (
                        <>
                          <br />
                          <span className="inline-flex items-center gap-1 text-gray-600 mt-1">
                            <MapPin size={14} />
                            {user.city}
                            {user.country && `, ${user.country}`}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= RECENT BOOKINGS ================= */}
        {user.bookings && user.bookings.length > 0 ? (
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-8 mb-8 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Calendar className="text-blue-600" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Recent Bookings</h3>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                {user.bookings.length} total
              </span>
            </div>
            
            <div className="space-y-3">
              {user.bookings.slice(0, 5).map((booking: any, index: number) => (
                <div
                  key={booking.id || index}
                  className="group flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Calendar className="text-blue-600" size={20} />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 mb-1 truncate">
                        {booking.service || `Appointment #${booking.id || index + 1}`}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {booking.date || "Date pending"}
                        </span>
                        {booking.status && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-700'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {booking.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shrink-0">
                    View Details →
                  </button>
                </div>
              ))}
            </div>

            {user.bookings.length > 5 && (
              <div className="mt-4 text-center">
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline">
                  View all {user.bookings.length} bookings
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-12 mb-8 border border-gray-100 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              You haven't made any appointments yet. Book your first service to get started!
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl">
              Browse Services
            </button>
          </div>
        )}

        {/* ================= FAVORITE PETS INFO ================= */}
        {favoritesCount > 0 && (
          <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                  <Heart className="text-pink-600" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Favorite Pets</h3>
              </div>
              <span className="px-3 py-1 bg-pink-100 text-pink-700 text-sm font-semibold rounded-full">
                {favoritesCount}
              </span>
            </div>

            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                You have {favoritesCount} pet{favoritesCount !== 1 ? 's' : ''} saved to favorites
              </p>
              <Link
                to="/favorites"
                className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors shadow-lg"
              >
                <Heart size={18} />
                View All Favorites
              </Link>
            </div>
          </div>
        )}

        {/* ================= LOGOUT BUTTON ================= */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;