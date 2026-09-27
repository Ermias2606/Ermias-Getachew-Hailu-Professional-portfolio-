import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Profile, InboxMessage } from '../types';

interface ContactSectionProps {
  profile: Profile;
  onNewMessage: (msg: Omit<InboxMessage, 'id' | 'read' | 'date'>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onNewMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Professional Inquiry');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !text.trim()) return;

    onNewMessage({
      sender: name.trim(),
      email: email.trim(),
      type: type,
      text: text.trim(),
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setText('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contactSection" className="mb-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            Direct Channel
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact & Professional Inquiry
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
            Get in touch for institutional banking appointments, supervisory opportunities, or collaborative risk research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Direct Channels Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                Direct Contact Information
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Email Address</div>
                    <div className="font-semibold text-slate-900 dark:text-white truncate">{profile.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Phone Line</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{profile.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-2.5 rounded-xl text-slate-700 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Location</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{profile.location}</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                Institutional messages are mirrored directly to the portfolio's encrypted Control Room inbox.
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Thank you! Your message has been routed to Ermias's administrative inbox and logged for priority review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contactInputName"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dabe Bedaso"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contactInputEmail"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. daabee86@gmail.com"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Inquiry Classification
                  </label>
                  <select
                    id="contactSelectType"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Professional Inquiry">Professional Inquiry</option>
                    <option value="Vacancy / Recruitment Notification">Vacancy / Recruitment Notification</option>
                    <option value="Audit / Compliance Consultation">Audit / Compliance Consultation</option>
                    <option value="Academic / Research Exchange">Academic / Research Exchange</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Message / Opportunity Description *
                  </label>
                  <textarea
                    id="contactInputMessage"
                    required
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your message or role specifications here..."
                    className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 leading-relaxed font-sans"
                  />
                </div>

                <button
                  id="btnSubmitContact"
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/10 hover:shadow-lg transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
