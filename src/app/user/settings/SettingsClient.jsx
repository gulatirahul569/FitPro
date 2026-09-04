"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Bell,
  Lock,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function SettingsClient() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/user/settings");

      if (!res.ok) {
        throw new Error("Failed to load settings");
      }

      const data = await res.json();
      setSettings(data.settings);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  function handleNotificationChange(field) {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  async function saveNotifications() {
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailNotifications: settings.emailNotifications,
          bookingNotifications: settings.bookingNotifications,
          trainingNotifications: settings.trainingNotifications,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save settings");
      }

      setSettings(data.settings);

      setMessage({
        type: "success",
        text: "Notification settings saved successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setSaving(false);
    }
  }

  async function changePassword(e) {
    e.preventDefault();

    setSaving(true);
    setMessage({ type: "", text: "" });

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({
        type: "error",
        text: "New password and confirm password do not match.",
      });
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwords),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage({
        type: "success",
        text: "Password changed successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        Failed to load settings.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account preferences and security.
        </p>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`flex items-center gap-3 rounded-xl border p-4 ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}

          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Account Information */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
            <User size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Account Information
            </h2>

            <p className="text-sm text-gray-500">
              Your basic account details.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <User size={18} className="text-gray-400" />

              <span className="text-sm text-gray-700">
                {settings.name}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <Mail size={18} className="text-gray-400" />

              <span className="truncate text-sm text-gray-700">
                {settings.email}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
            <Bell size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Notifications
            </h2>

            <p className="text-sm text-gray-500">
              Choose which notifications you want to receive.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <NotificationToggle
            title="Email Notifications"
            description="Receive important account updates through email."
            checked={settings.emailNotifications}
            onChange={() =>
              handleNotificationChange("emailNotifications")
            }
          />

          <NotificationToggle
            title="Booking Notifications"
            description="Get notified when your booking status changes."
            checked={settings.bookingNotifications}
            onChange={() =>
              handleNotificationChange("bookingNotifications")
            }
          />

          <NotificationToggle
            title="Training Notifications"
            description="Receive updates related to your training."
            checked={settings.trainingNotifications}
            onChange={() =>
              handleNotificationChange("trainingNotifications")
            }
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={saveNotifications}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}

            Save Notifications
          </button>
        </div>
      </section>

      {/* Password */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
            <Lock size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Change Password
            </h2>

            <p className="text-sm text-gray-500">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>

        <form onSubmit={changePassword} className="space-y-5">
          <PasswordInput
            label="Current Password"
            value={passwords.currentPassword}
            onChange={(value) =>
              setPasswords((prev) => ({
                ...prev,
                currentPassword: value,
              }))
            }
          />

          <PasswordInput
            label="New Password"
            value={passwords.newPassword}
            onChange={(value) =>
              setPasswords((prev) => ({
                ...prev,
                newPassword: value,
              }))
            }
          />

          <PasswordInput
            label="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={(value) =>
              setPasswords((prev) => ({
                ...prev,
                confirmPassword: value,
              }))
            }
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Lock size={18} />
              )}

              Change Password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function NotificationToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function PasswordInput({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        minLength={6}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}