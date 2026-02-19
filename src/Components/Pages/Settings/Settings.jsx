import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Bell, Mail, Lock, Shield, Heart, Calendar, Trash2, ChevronRight } from "lucide-react";

const SettingsPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Settings state
  const [notifications, setNotifications] = useState({
    petAlerts: true,
    adoptionUpdates: true,
    vetReminders: true,
    trainingTips: false,
  });

  const [emailPreferences, setEmailPreferences] = useState({
    newsletter: true,
    newPets: true,
    promotions: false,
    weeklyDigest: true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(user?.emailVerified || false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEmailToggle = (key) => {
    setEmailPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Add password change logic here
    console.log("Password change submitted");
    setShowPasswordChange(false);
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleSendVerification = () => {
    // Send verification email
    console.log("Sending verification code to:", user.email);
    setVerificationSent(true);
    // Simulate sending email
    setTimeout(() => {
      alert("Verification code sent to " + user.email);
    }, 500);
  };

  const handleVerifyEmail = () => {
    // Verify the code
    if (verificationCode.length === 6) {
      console.log("Verifying code:", verificationCode);
      // Simulate verification success
      setIsVerified(true);
      setShowVerification(false);
      setVerificationCode("");
      setVerificationSent(false);
      alert("Email verified successfully!");
    } else {
      alert("Please enter a valid 6-digit code");
    }
  };

  const handleDeleteAccount = () => {
    // Add account deletion logic here
    console.log("Account deletion requested");
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link to="/profile" className="text-purple-600 hover:underline mb-4 inline-flex items-center gap-2">
            ← Back to Profile
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and notifications</p>
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Shield className="text-purple-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Account</h2>
              <p className="text-sm text-gray-600">Manage your account security</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email Verification */}
            <div className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-600" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Email Verification</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                {isVerified ? (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowVerification(!showVerification)}
                    className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Verify Email
                  </button>
                )}
              </div>

              {showVerification && !isVerified && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-4">
                    {!verificationSent ? (
                      <div>
                        <p className="text-sm text-gray-600 mb-3">
                          We'll send a 6-digit verification code to <strong>{user.email}</strong>
                        </p>
                        <button
                          onClick={handleSendVerification}
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Send Verification Code
                        </button>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enter 6-digit code
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            maxLength="6"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="000000"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-xl tracking-widest font-mono"
                          />
                          <button
                            onClick={handleVerifyEmail}
                            disabled={verificationCode.length !== 6}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Verify
                          </button>
                        </div>
                        <button
                          onClick={handleSendVerification}
                          className="mt-3 text-sm text-purple-600 hover:underline"
                        >
                          Resend code
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Change Password */}
            <button
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Lock className="text-gray-600" size={20} />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Change Password</p>
                  <p className="text-sm text-gray-600">Update your password regularly</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </button>

            {showPasswordChange && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handlePasswordChange}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => setShowPasswordChange(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Bell className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Push Notifications</h2>
              <p className="text-sm text-gray-600">Stay updated with important alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            <NotificationToggle
              icon={<Heart size={18} />}
              title="Pet Alerts"
              description="Get notified when new pets match your preferences"
              checked={notifications.petAlerts}
              onChange={() => handleNotificationToggle("petAlerts")}
            />
            <NotificationToggle
              icon={<Bell size={18} />}
              title="Adoption Updates"
              description="Updates on your adoption applications"
              checked={notifications.adoptionUpdates}
              onChange={() => handleNotificationToggle("adoptionUpdates")}
            />
            <NotificationToggle
              icon={<Calendar size={18} />}
              title="Vet Appointment Reminders"
              description="Reminders for upcoming vet appointments"
              checked={notifications.vetReminders}
              onChange={() => handleNotificationToggle("vetReminders")}
            />
            <NotificationToggle
              icon={<Mail size={18} />}
              title="Training Tips"
              description="Weekly tips for training your pet"
              checked={notifications.trainingTips}
              onChange={() => handleNotificationToggle("trainingTips")}
            />
          </div>
        </div>

        {/* Email Preferences Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Mail className="text-green-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Email Preferences</h2>
              <p className="text-sm text-gray-600">Choose what emails you want to receive</p>
            </div>
          </div>

          <div className="space-y-4">
            <NotificationToggle
              icon={<Mail size={18} />}
              title="Newsletter"
              description="Monthly newsletter with pet care tips and stories"
              checked={emailPreferences.newsletter}
              onChange={() => handleEmailToggle("newsletter")}
            />
            <NotificationToggle
              icon={<Heart size={18} />}
              title="New Pet Alerts"
              description="Email alerts for newly available pets"
              checked={emailPreferences.newPets}
              onChange={() => handleEmailToggle("newPets")}
            />
            <NotificationToggle
              icon={<Mail size={18} />}
              title="Promotions & Offers"
              description="Special offers from partner services"
              checked={emailPreferences.promotions}
              onChange={() => handleEmailToggle("promotions")}
            />
            <NotificationToggle
              icon={<Calendar size={18} />}
              title="Weekly Digest"
              description="Weekly summary of available pets and updates"
              checked={emailPreferences.weeklyDigest}
              onChange={() => handleEmailToggle("weeklyDigest")}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="text-red-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Danger Zone</h2>
              <p className="text-sm text-gray-600">Irreversible actions</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Delete Account</h3>
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your account, there is no going back. All your data, favorites, and bookings will be permanently deleted.
              </p>
              
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete My Account
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-red-700 font-semibold">Are you absolutely sure?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDeleteAccount}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Yes, Delete Account
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Toggle Component
const NotificationToggle = ({ icon, title, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-gray-600">{icon}</div>
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-purple-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default SettingsPage;