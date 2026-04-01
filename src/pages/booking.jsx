import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/authContext';
import apiService from '../services/api';

const SERVICE_OPTIONS = [
  { value: 'plan_trip', label: 'Plan a trip' },
  { value: 'book_now', label: 'Book now' },
  { value: 'consultation', label: 'Travel consultation' },
  { value: 'general', label: 'General inquiry' },
];

const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

function validService(v) {
  return SERVICE_OPTIONS.some((o) => o.value === v);
}

export default function Booking() {
  const { darkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const [myList, setMyList] = useState(null);
  const [myListError, setMyListError] = useState(null);

  const [searchParams] = useSearchParams();
  const serviceFromUrl = searchParams.get('service');

  const defaultService = useMemo(() => {
    if (validService(serviceFromUrl)) return serviceFromUrl;
    return 'general';
  }, [serviceFromUrl]);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    appointmentDate: todayStr,
    appointmentTime: '10:00',
    serviceType: defaultService,
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setMyList(null);
      setMyListError(null);
      return;
    }
    let cancelled = false;
    setMyListError(null);
    (async () => {
      try {
        const data = await apiService.getMyAppointments(0, 10);
        if (!cancelled) setMyList(data);
      } catch (e) {
        if (!cancelled) setMyListError(e.message || 'Could not load your bookings.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, created]);

  React.useEffect(() => {
    setForm((f) => ({ ...f, serviceType: defaultService }));
  }, [defaultService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await apiService.createAppointment({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        serviceType: form.serviceType,
        notes: form.notes,
      });
      setCreated(res);
      setForm((f) => ({
        ...f,
        fullName: '',
        email: '',
        phone: '',
        notes: '',
      }));
    } catch (err) {
      setError(err.message || 'Could not submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const shell = darkMode ? 'bg-gray-950 text-white' : 'bg-sky-50 text-gray-900';
  const card = darkMode
    ? 'bg-gray-900/80 border border-white/10'
    : 'bg-white border border-sky-200/80 shadow-xl shadow-sky-500/10';
  const input = darkMode
    ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-sky-400 focus:ring-sky-400/20'
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500/20';

  return (
    <div className={`min-h-screen ${shell}`}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p
            className={`text-sm font-medium tracking-widest uppercase mb-2 ${
              darkMode ? 'text-sky-400' : 'text-sky-600'
            }`}
          >
            WanderLuxe
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Book an appointment</h1>
          <p className={`mb-8 text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Choose a date and time for a travel consultation or booking request. If you are signed in, this
            request is linked to your account.
          </p>

          {created && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-8 rounded-2xl p-5 border ${
                darkMode ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-emerald-200 bg-emerald-50'
              }`}
            >
              <p className={`font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                Request received
              </p>
              <p className={`mt-2 text-sm ${darkMode ? 'text-emerald-100/90' : 'text-emerald-900/90'}`}>
                Reference #{created.id}. We will contact you at{' '}
                <span className="font-medium">{created.email}</span> to confirm details.
              </p>
            </motion.div>
          )}

          {error && (
            <div
              className={`mb-6 rounded-xl px-4 py-3 text-sm ${
                darkMode ? 'bg-red-500/15 text-red-200 border border-red-500/30' : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={`rounded-2xl p-6 sm:p-8 ${card}`}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-xl border px-4 py-3 outline-none ring-0 transition focus:ring-2 ${input}`}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 ${input}`}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 ${input}`}
                  placeholder="+65 …"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Service</label>
                <select
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 ${input}`}
                >
                  {SERVICE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Preferred date</label>
                  <input
                    name="appointmentDate"
                    type="date"
                    min={todayStr}
                    value={form.appointmentDate}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 ${input}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Preferred time</label>
                  <select
                    name="appointmentTime"
                    value={form.appointmentTime}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 ${input}`}
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Notes (optional)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 resize-y ${input}`}
                  placeholder="Destinations, party size, special requests…"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`mt-8 w-full rounded-xl py-3.5 text-sm font-semibold tracking-wide transition ${
                darkMode
                  ? 'bg-sky-500 text-white hover:bg-sky-400 disabled:opacity-60'
                  : 'bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60'
              }`}
            >
              {submitting ? 'Sending…' : 'Submit request'}
            </button>

            {!isAuthenticated && (
              <p className={`mt-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Link to="/join" className={`font-medium ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                  Create an account
                </Link>{' '}
                or sign in so bookings appear under your profile.
              </p>
            )}
          </form>

          {isAuthenticated && (
            <div className={`mt-10 rounded-2xl p-6 ${card}`}>
              <h2 className="text-lg font-semibold mb-3">Your recent requests</h2>
              {myListError && (
                <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>{myListError}</p>
              )}
              {myList && myList.total === 0 && !myListError && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No bookings yet.</p>
              )}
              {myList && myList.appointments?.length > 0 && (
                <ul className="space-y-3">
                  {myList.appointments.map((a) => (
                    <li
                      key={a.id}
                      className={`text-sm border-b pb-3 last:border-0 ${darkMode ? 'border-white/10' : 'border-gray-200'}`}
                    >
                      <span className="font-medium">
                        {a.appointment_date} · {a.appointment_time}
                      </span>
                      <span className={`ml-2 capitalize ${darkMode ? 'text-sky-300' : 'text-sky-700'}`}>
                        ({a.service_type.replace(/_/g, ' ')})
                      </span>
                      <span
                        className={`ml-2 text-xs uppercase tracking-wide ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {a.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
