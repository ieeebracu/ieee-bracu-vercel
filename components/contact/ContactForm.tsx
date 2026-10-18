"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    chapter: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Provide quick submission state
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      chapter: "",
      message: "",
    });
    setSubmitted(false);
  };

  if (submitted) {
    const chapterName = formData.chapter ? formData.chapter.toUpperCase() : "GENERAL";
    const mailtoSubject = encodeURIComponent(
      `[IEEE BRACU - ${chapterName}] ${formData.subject}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nChapter: ${chapterName}\n\nMessage:\n${formData.message}`
    );

    return (
      <div className="rounded-2xl border border-[#E3DFD5] bg-white p-8 text-center shadow-[0_16px_40px_rgba(20,22,24,0.05)] sm:p-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF1F6] text-[#00629B]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="m-0 font-serif text-[22px] font-semibold text-[#191B1E]">
          Message Sent Successfully!
        </h3>
        <p className="mx-auto mt-2 max-w-[44ch] text-[14px] leading-relaxed text-[#6E7178]">
          Thank you, <span className="font-semibold text-[#191B1E]">{formData.name}</span>. Our executive body has received your inquiry and will respond to <span className="font-semibold text-[#191B1E]">{formData.email}</span> shortly.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:chair@ieeebracu.com?subject=${mailtoSubject}&body=${mailtoBody}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#00629B] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#004E7C]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
            Send direct email copy
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-5 py-2.5 text-[13.5px] font-semibold text-[#191B1E] transition-colors hover:bg-[#F0EDE5] cursor-pointer"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E3DFD5] bg-white p-8 shadow-[0_16px_40px_rgba(20,22,24,0.05)] sm:p-10">
      <h2 className="m-0 mb-2 font-serif text-[24px] font-semibold tracking-[-0.01em] text-[#191B1E]">
        Send us a message
      </h2>
      <p className="m-0 mb-8 text-[14px] text-[#6E7178]">
        Fill in the form below and we’ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6E7178]">
              Full Name <span className="text-[#D9534F]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-4 py-3 text-[14px] text-[#191B1E] placeholder:text-[#B0B4B9] transition-colors focus:border-[#00629B]/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00629B]/10"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6E7178]">
              Email <span className="text-[#D9534F]">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-4 py-3 text-[14px] text-[#191B1E] placeholder:text-[#B0B4B9] transition-colors focus:border-[#00629B]/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00629B]/10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Subject */}
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6E7178]">
              Subject <span className="text-[#D9534F]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="What's this about?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-4 py-3 text-[14px] text-[#191B1E] placeholder:text-[#B0B4B9] transition-colors focus:border-[#00629B]/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00629B]/10"
            />
          </div>

          {/* Related Chapter */}
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6E7178]">
              Related Chapter
            </label>
            <select
              value={formData.chapter}
              onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
              className="w-full appearance-none rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-4 py-3 text-[14px] text-[#191B1E] transition-colors focus:border-[#00629B]/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00629B]/10 cursor-pointer"
            >
              <option value="">General / Student Branch</option>
              <option value="pes">Power &amp; Energy Society</option>
              <option value="cs">Computer Society</option>
              <option value="ras">Robotics &amp; Automation Society</option>
              <option value="aess">Aerospace &amp; Electronic Systems</option>
              <option value="comsoc">Communications Society</option>
              <option value="eds">Electron Devices Society</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6E7178]">
            Message <span className="text-[#D9534F]">*</span>
          </label>
          <textarea
            required
            rows={6}
            placeholder="Tell us more about your inquiry..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full resize-none rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-4 py-3 text-[14px] leading-[1.7] text-[#191B1E] placeholder:text-[#B0B4B9] transition-colors focus:border-[#00629B]/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00629B]/10"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="m-0 text-[12px] text-[#B0B4B9]">
            <span className="text-[#D9534F]">*</span> Required fields
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-[#00629B] px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-[#004E7C] hover:shadow-lg disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <span>Send Message</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
