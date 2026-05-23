import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, MessageSquare, Mail, Trash2,
  Eye, RefreshCw, ChevronDown, ChevronUp,
  Search, Inbox, Clock, CheckCheck, Settings as SettingsIcon, Save,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

function MessageRow({ msg, onMarkRead, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [busy,     setBusy]     = useState(false);

  const markRead = async () => {
    if (msg.read) return;
    setBusy(true);
    try { await onMarkRead(msg._id); }
    finally { setBusy(false); }
  };

  const del = async () => {
    if (!window.confirm(`Delete message from ${msg.name}? This cannot be undone.`)) return;
    setBusy(true);
    try { await onDelete(msg._id); }
    finally { setBusy(false); }
  };

  // Auto-mark as read when expanded
  const toggleExpand = () => {
    const next = !expanded;
    setExpanded(next);
    if (next && !msg.read) {
      onMarkRead(msg._id);
    }
  };

  // Relative time helper
  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className={`border-b border-white/5 transition-colors duration-200 ${
        !msg.read ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
      }`}
    >
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
        onClick={toggleExpand}
      >
        <div className="flex-shrink-0 w-5 flex justify-center">
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              msg.read ? 'bg-transparent scale-0' : 'bg-white scale-100'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-0.5 flex-wrap">
            <span className={`text-sm ${!msg.read ? 'text-white font-semibold' : 'text-white/70 font-medium'}`}>
              {msg.name}
            </span>
            <span className="text-white/25 text-xs hidden sm:block truncate">{msg.email}</span>
            {!msg.read && (
              <span className="text-[10px] border border-white/20 text-white/50 px-1.5 py-px leading-none tracking-widest flex-shrink-0 uppercase">
                New
              </span>
            )}
          </div>
          <p className="text-white/25 text-xs truncate max-w-md">
            {msg.subject && msg.subject !== 'No subject'
              ? msg.subject
              : msg.message?.slice(0, 80) + (msg.message?.length > 80 ? '…' : '')}
          </p>
        </div>

        <span className="text-white/20 text-xs flex-shrink-0 hidden md:block tabular-nums">
          {timeAgo(msg.createdAt)}
        </span>

        <div className="flex items-center gap-0.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
          {!msg.read && (
            <button
              onClick={markRead}
              disabled={busy}
              title="Mark as read"
              className="p-2 text-white/20 hover:text-white/60 transition-colors disabled:opacity-30 rounded"
            >
              <Eye size={13} />
            </button>
          )}
          <button
            onClick={del}
            disabled={busy}
            title="Delete message"
            className="p-2 text-white/20 hover:text-red-400 transition-colors disabled:opacity-30 rounded"
          >
            <Trash2 size={13} />
          </button>
          <div className="p-2 text-white/20">
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-6 pt-2 border-t border-white/5 ml-5">
              <div className="grid sm:grid-cols-3 gap-4 mb-5 text-xs">
                <div>
                  <p className="text-white/20 uppercase tracking-widest mb-1">From</p>
                  <p className="text-white/60">{msg.name}</p>
                </div>
                <div>
                  <p className="text-white/20 uppercase tracking-widest mb-1">Email</p>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-white/60 hover:text-white transition-colors underline underline-offset-2 decoration-white/10 hover:decoration-white/40"
                  >
                    {msg.email}
                  </a>
                </div>
                <div>
                  <p className="text-white/20 uppercase tracking-widest mb-1">Sent</p>
                  <p className="text-white/60">
                    {new Date(msg.createdAt).toLocaleString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {msg.subject && msg.subject !== 'No subject' && (
                <div className="mb-4">
                  <p className="text-white/20 uppercase tracking-widest text-xs mb-1">Subject</p>
                  <p className="text-white/50 text-sm">{msg.subject}</p>
                </div>
              )}

              <div className="border-l-2 border-white/8 pl-4">
                <p className="text-white/55 text-sm leading-relaxed whitespace-pre-line">
                  {msg.message}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Your message')}`}
                  className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white
                             border border-white/10 hover:border-white/30 px-4 py-2.5 transition-all duration-200"
                >
                  <Mail size={11} /> Reply to {msg.name}
                </a>
                {!msg.read && (
                  <button
                    onClick={markRead}
                    disabled={busy}
                    className="inline-flex items-center gap-2 text-xs text-white/20 hover:text-white/50 transition-colors"
                  >
                    <CheckCheck size={11} /> Mark as read
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border p-5 text-left transition-all duration-200 group ${
        active
          ? 'border-white/15 bg-white/[0.02]'
          : 'border-white/5 hover:border-white/10'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon size={14} className={`transition-colors ${active ? 'text-white/40' : 'text-white/15'}`} />
      </div>
      <p className="text-2xl md:text-3xl font-bold text-white mb-1 tabular-nums">{value}</p>
      <p className="text-white/25 text-xs tracking-widest uppercase">{label}</p>
    </button>
  );
}

export default function AdminDashboard() {
  const { admin, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [filter,   setFilter]   = useState('all'); // 'all' | 'unread' | 'read'
  const [search,   setSearch]   = useState('');
  
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'settings'
  const [resumeLink, setResumeLink] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    if (!loading && !admin) navigate('/admin', { replace: true });
  }, [admin, loading, navigate]);

  const fetchMessages = useCallback(async () => {
    setFetching(true);
    try {
      const res = await api.get('/contact/messages');
      setMessages(res.data);
    } catch {
      toast.error('Failed to load messages.');
    } finally {
      setFetching(false);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await api.get('/settings');
      setResumeLink(res.data.resumeDriveLink || '');
    } catch {
      toast.error('Failed to load settings.');
    }
  }, []);

  useEffect(() => {
    if (admin) {
      fetchMessages();
      fetchSettings();
    }
  }, [admin, fetchMessages, fetchSettings]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await api.put('/settings', { resumeDriveLink: resumeLink });
      toast.success('Settings saved successfully.');
    } catch {
      toast.error('Failed to save settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleMarkRead = async (id) => {
    // Optimistic
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
    try {
      await api.patch(`/contact/messages/${id}/read`);
    } catch {
      // Revert
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: false } : m));
      toast.error('Failed to mark as read.');
    }
  };

  const handleDelete = async (id) => {
    const backup = messages;
    setMessages(prev => prev.filter(m => m._id !== id));
    try {
      await api.delete(`/contact/messages/${id}`);
      toast.success('Message deleted.');
    } catch {
      setMessages(backup);
      toast.error('Failed to delete message.');
    }
  };

  const handleMarkAllRead = async () => {
    const unreadIds = messages.filter(m => !m.read).map(m => m._id);
    if (unreadIds.length === 0) return;
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
    try {
      await Promise.all(unreadIds.map(id => api.patch(`/contact/messages/${id}/read`)));
      toast.success(`Marked ${unreadIds.length} messages as read.`);
    } catch {
      toast.error('Some messages could not be marked as read.');
      fetchMessages();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  if (loading || !admin) return null;

  const total  = messages.length;
  const unread = messages.filter(m => !m.read).length;

  let filtered =
    filter === 'unread' ? messages.filter(m => !m.read) :
    filter === 'read'   ? messages.filter(m =>  m.read) :
    messages;

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject?.toLowerCase().includes(q) ||
      m.message?.toLowerCase().includes(q)
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 font-kanit">

      <header className="sticky top-0 z-40 border-b border-white/5 bg-dark-900/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold text-sm tracking-wide">
              Admin Panel
            </span>
            <span className="text-white/20 text-xs hidden sm:block">
              {admin.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {unread > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="hidden sm:flex items-center gap-1.5 text-xs text-white/20 hover:text-white/60 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck size={13} /> Mark all read
              </button>
            )}
            <button
              onClick={fetchMessages}
              disabled={fetching}
              title="Refresh messages"
              className="p-1.5 text-white/25 hover:text-white transition-colors disabled:opacity-30"
            >
              <RefreshCw size={13} className={fetching ? 'animate-spin' : ''} />
            </button>
            <div className="w-px h-4 bg-white/8 mx-1" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-white/25 hover:text-white transition-colors"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-20">

        <div className="flex gap-6 border-b border-white/5 mb-8">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`pb-3 text-sm tracking-widest uppercase transition-colors border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === 'inbox'
                ? 'border-white text-white'
                : 'border-transparent text-white/40 hover:text-white/80'
            }`}
          >
            <Inbox size={16} /> Inbox
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 text-sm tracking-widest uppercase transition-colors border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'border-white text-white'
                : 'border-transparent text-white/40 hover:text-white/80'
            }`}
          >
            <SettingsIcon size={16} /> Settings
          </button>
        </div>

        {activeTab === 'settings' ? (
          <div className="max-w-2xl">
            <h2 className="text-white text-xl font-bold mb-6">Site Settings</h2>
            
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="p-6 border border-white/5 bg-white/[0.01]">
                <h3 className="text-white text-sm tracking-widest uppercase mb-2">Resume Configuration</h3>
                <p className="text-white/40 text-xs mb-6">
                  Paste a Google Drive sharing link here. The portfolio will automatically convert it
                  into a direct download link and a direct preview iframe on the /resume page.
                </p>
                
                <div className="space-y-2">
                  <label className="text-white/30 text-xs tracking-wide uppercase block">
                    Google Drive Resume Link
                  </label>
                  <input
                    type="url"
                    value={resumeLink}
                    onChange={e => setResumeLink(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white
                             placeholder-white/15 focus:border-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={savingSettings}
                className="btn disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2"
              >
                <span>{savingSettings ? 'Saving...' : 'Save Settings'}</span>
                <Save size={14} />
              </button>
            </form>
          </div>
        ) : (
          <>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={Inbox}
            label="Total"
            value={total}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <StatCard
            icon={MessageSquare}
            label="Unread"
            value={unread}
            active={filter === 'unread'}
            onClick={() => setFilter('unread')}
          />
          <StatCard
            icon={Clock}
            label="Read"
            value={total - unread}
            active={filter === 'read'}
            onClick={() => setFilter('read')}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-0">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-transparent border border-white/8 text-white text-xs pl-9 pr-4 py-2.5
                       placeholder:text-white/15 focus:outline-none focus:border-white/20
                       transition-colors duration-200"
            />
          </div>

          <div className="flex items-center gap-0 border-b border-white/5 sm:border-b-0 sm:ml-auto">
            {[
              { id: 'all',    label: `All (${total})` },
              { id: 'unread', label: `Unread (${unread})` },
              { id: 'read',   label: `Read (${total - unread})` },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-4 py-3 text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px ${
                  filter === t.id
                    ? 'border-white text-white'
                    : 'border-transparent text-white/25 hover:text-white/60'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {fetching ? (
          <div className="mt-1 space-y-px">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-white/[0.02] border-b border-white/5"
                style={{
                  animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-12 h-12 border border-white/8 flex items-center justify-center mx-auto mb-5">
              {search
                ? <Search size={18} className="text-white/10" />
                : <MessageSquare size={18} className="text-white/10" />
              }
            </div>
            <p className="text-white/25 text-sm mb-1">
              {search
                ? `No results for "${search}"`
                : filter === 'unread'
                ? 'No unread messages.'
                : filter === 'read'
                ? 'No read messages yet.'
                : 'No messages yet.'}
            </p>
            <p className="text-white/15 text-xs">
              {search
                ? 'Try a different search term.'
                : 'Share your portfolio to start receiving messages.'}
            </p>
          </div>
        ) : (
          <div className="border border-white/5 border-t-0 mt-px">
            <AnimatePresence>
              {filtered.map(msg => (
                <MessageRow
                  key={msg._id}
                  msg={msg}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {!fetching && filtered.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/10 text-xs text-center mt-6"
          >
            Showing {filtered.length} of {total} messages
          </motion.p>
        )}
          </>
        )}
      </div>
    </div>
  );
}
