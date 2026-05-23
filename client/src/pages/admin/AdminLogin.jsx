import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login, admin, loading } = useAuth();
  const navigate = useNavigate();

  const [form,     setForm]     = useState({ email: '', password: '' });
  const [busy,     setBusy]     = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Already logged in → redirect immediately
  useEffect(() => {
    if (!loading && admin) navigate('/admin/dashboard', { replace: true });
  }, [admin, loading, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Enter email and password.');
      return;
    }
    setBusy(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back.');
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed.');
    } finally {
      setBusy(false);
    }
  };

  const inputClass = `
    w-full bg-dark-800 border border-white/8 text-white text-sm pl-10 pr-4 py-3
    placeholder:text-white/20 focus:outline-none focus:border-white/25
    transition-colors duration-200 font-kanit
  `;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-dark-900">
      {/* Subtle background grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="w-10 h-10 border border-white/10 flex items-center justify-center mb-6"
          >
            <Shield size={16} className="text-white/30" />
          </motion.div>
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-3">Portfolio</p>
          <h1 className="text-3xl font-bold text-white">Admin</h1>
          <p className="text-white/30 text-sm mt-1 font-light">Private access only.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="admin@email.com"
              autoComplete="email"
              className={inputClass}
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              autoComplete="current-password"
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPass(p => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
              aria-label={showPass ? 'Hide password' : 'Show password'}
            >
              {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </motion.div>

          <motion.button
            type="submit"
            disabled={busy}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="btn w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            <span>{busy ? 'Signing in…' : 'Sign In'}</span>
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-white/15 text-xs"
        >
          Unauthorised access is prohibited.
        </motion.p>
      </motion.div>
    </div>
  );
}
