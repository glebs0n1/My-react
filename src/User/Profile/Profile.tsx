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
  MapPin,
  Home as HomeIcon,
  PawPrint,
  Lightbulb,
  Dog,
  Stethoscope,
  Scissors,
  ChevronRight,
  User,
} from "lucide-react";

// ✅ IMPORT YOUR NAVBAR
import Navbar from "../../Components/NavBar/Navbar";

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [favoritesCount, setFavoritesCount] = React.useState(0);

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
      } catch {
        setFavoritesCount(0);
      }
    };

    updateFavoritesCount();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `favorites_${user?.email}`) updateFavoritesCount();
    };
    const handleLikesChange = () => updateFavoritesCount();

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

  // =========== NOT AUTHENTICATED ===========
  if (!isAuthenticated || !user) {
    return (
      <>
        {/* ✅ ADD NAVBAR */}
        <Navbar />
        
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4 pt-24">
          <div className="w-full max-w-md text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
              <User className="h-10 w-10 text-purple-600" />
            </div>
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              Prisijunkite
            </h1>
            <p className="mb-8 text-gray-600">
              Prisijunkite, kad galėtumėte peržiūrėti savo profilį ir paslaugas.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-all hover:bg-purple-700"
            >
              <HomeIcon className="h-4 w-4" />
              Grįžti į pradžią
            </Link>
          </div>
        </div>
      </>
    );
  }

  // =========== HELPERS ===========
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

  const services = [
    { icon: PawPrint, label: "Prieglauda", color: "text-purple-600", link: "/shelter" },
    { icon: Lightbulb, label: "Patarimai", color: "text-amber-600", link: "/articles" },
    { icon: Dog, label: "Dresavimas", color: "text-blue-600", link: "/training" },
    { icon: Stethoscope, label: "Veterinarija", color: "text-emerald-600", link: "/veterinarian" },
    { icon: Scissors, label: "Kirpykla", color: "text-pink-600", link: "/grooming" },
  ];

  return (
    <>
      {/* ✅ ADD NAVBAR AT THE TOP */}
      <Navbar />
      
      {/* ✅ YOUR EXISTING PROFILE CONTENT - NO CHANGES NEEDED! */}
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

          {/* ============ HEADER CARD ============ */}
          <div
            className="relative mb-8 overflow-hidden rounded-2xl shadow-lg animate-fade-in"
          >
            {/* Warm gradient header */}
            <div className="h-32 sm:h-36 bg-gradient-to-r from-purple-400 via-purple-500 to-fuchsia-500" />

            <div className="relative bg-white px-6 pb-6">
              {/* Avatar */}
              <div className="-mt-14 mb-4 flex items-end justify-between">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-purple-500 to-purple-700 text-2xl font-bold text-white shadow-lg">
                  {getInitials()}
                </div>
                <Link
                  to="/profile/edit"
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4" />
                  Redaguoti
                </Link>
              </div>

              {/* Name & Info */}
              <h1 className="text-2xl font-bold text-gray-900">
                {user.name || user.email.split("@")[0]}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  {user.role || "Narys"}
                </span>
              </div>

              {user.bio && (
                <p className="mt-3 text-sm text-gray-600">{user.bio}</p>
              )}
            </div>
          </div>

          {/* ============ SERVICES ROW ============ */}
          <div
            className="mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Paslaugos
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {services.map((svc) => (
                <Link
                  key={svc.label}
                  to={svc.link}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg hover:border-purple-300"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 transition-colors group-hover:bg-purple-100">
                    <svc.icon className={`h-5 w-5 ${svc.color}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-900">
                    {svc.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ============ STATS CARDS ============ */}
          <div
            className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            {/* Bookings */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {user.bookings?.length || 0}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900">Mano rezervacijos</p>
              <p className="text-xs text-gray-500">Aktyvūs susitikimai</p>
            </div>

            {/* Favorites */}
            <Link
              to="/favorites"
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                  <Heart className="h-5 w-5 text-pink-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {favoritesCount}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900">Mėgstami augintiniai</p>
              <p className="text-xs text-gray-500">Išsaugoti į mėgstamus</p>
            </Link>

            {/* Status */}
            <Link
              to="/settings"
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-green-600">✓ Aktyvus</span>
              </div>
              <p className="text-sm font-medium text-gray-900">Paskyros būsena</p>
              <p className="text-xs text-gray-500">Paskyra patvirtinta</p>
            </Link>
          </div>

          {/* ============ CONTACT INFO ============ */}
          {(user.email || user.phone || user.address) && (
            <div
              className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Settings className="h-5 w-5 text-gray-500" />
                Kontaktinė informacija
              </h2>

              <div className="space-y-4">
                {user.email && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                      <Mail className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">El. paštas</p>
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                      <Phone className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Telefonas</p>
                      <p className="text-sm font-medium text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                      <MapPin className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Adresas</p>
                      <p className="text-sm font-medium text-gray-900">
                        {user.address}
                        {user.city && `, ${user.city}`}
                        {user.country && `, ${user.country}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============ RECENT BOOKINGS ============ */}
          <div
            className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            {user.bookings && user.bookings.length > 0 ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    Paskutinės rezervacijos
                  </h2>
                  <span className="text-xs text-gray-500">
                    {user.bookings.length} iš viso
                  </span>
                </div>

                <div className="space-y-3">
                  {user.bookings.slice(0, 5).map((booking: any, index: number) => (
                    <div
                      key={booking.id || index}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-purple-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100">
                          <Calendar className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {booking.service || `Susitikimas #${booking.id || index + 1}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.date || "Data laukiama"}
                          </p>
                        </div>
                      </div>
                      {booking.status && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          {booking.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Rezervacijų dar nėra
                </h3>
                <p className="mb-6 text-sm text-gray-600">
                  Dar neturite jokių susitikimų. Užsisakykite pirmąją paslaugą!
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-700"
                >
                  Naršyti paslaugas
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* ============ FAVORITES INFO ============ */}
          {favoritesCount > 0 && (
            <div
              className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Heart className="h-5 w-5 text-pink-600" />
                    Mėgstami augintiniai
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Turite {favoritesCount} išsaugotų augintinių
                  </p>
                </div>
                <Link
                  to="/favorites"
                  className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:underline"
                >
                  Peržiūrėti visus
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* ============ LOGOUT ============ */}
          <div className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              Atsijungti
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;