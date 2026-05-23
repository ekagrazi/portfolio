import { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../components/Icons';
import toast from 'react-hot-toast';
import api from '../utils/api';
import AnimatedSection from '../components/AnimatedSection';
import ClipReveal      from '../components/ClipReveal';
import PageTransition  from '../components/PageTransition';
import { owner }       from '../data/portfolioData';
import ShootingStars    from '../components/ShootingStars';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSending(true);
    try {
      const { data } = await api.post('/contact', form);
      toast.success(data.message || 'Message sent!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  return (
    <PageTransition>
      <ShootingStars />
      <main className="pt-24">
        <div className="section">
          <AnimatedSection>
            <p className="section-label">Get in touch</p>
            <ClipReveal><h1 className="section-heading">Contact</h1></ClipReveal>
            <p className="section-sub">
              Have a question, project idea, or opportunity? Drop me a message.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-white/30 text-xs tracking-wide uppercase block mb-2">
                    Name <span className="text-white/20">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white
                             placeholder-white/15 focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-white/30 text-xs tracking-wide uppercase block mb-2">
                    Email <span className="text-white/20">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white
                             placeholder-white/15 focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-white/30 text-xs tracking-wide uppercase block mb-2">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white
                             placeholder-white/15 focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="text-white/30 text-xs tracking-wide uppercase block mb-2">
                    Message <span className="text-white/20">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white
                             placeholder-white/15 focus:border-white/30 focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="btn disabled:opacity-40 disabled:pointer-events-none"
                >
                  <span>{sending ? 'Sending...' : 'Send Message'}</span>
                  <span><Send size={14} /></span>
                </button>
              </form>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <div>
                  <p className="text-white/30 text-xs tracking-wide uppercase mb-3">Direct</p>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${owner.email}`}
                      className="flex items-center gap-3 text-white/40 hover:text-white text-sm transition-colors"
                    >
                      <Mail size={14} /> {owner.email}
                    </a>
                    <a
                      href={`tel:${owner.phone}`}
                      className="flex items-center gap-3 text-white/40 hover:text-white text-sm transition-colors"
                    >
                      <Phone size={14} /> {owner.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-white/30 text-xs tracking-wide uppercase mb-3">Social</p>
                  <div className="space-y-3">
                    <a
                      href={owner.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white/40 hover:text-white text-sm transition-colors"
                    >
                      <Github size={14} /> github.com/ekagrazi
                    </a>
                    <a
                      href={owner.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white/40 hover:text-white text-sm transition-colors"
                    >
                      <Linkedin size={14} /> linkedin.com/in/ekagrazi
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-white/30 text-xs tracking-wide uppercase mb-3">Location</p>
                  <p className="text-white/40 text-sm">{owner.location}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
