import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, CheckCircle, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ cert, isOpen, onClose }) {
  if (!isOpen || !cert) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030712]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl glass-panel bg-[#0b0f19] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close certificate modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/60 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Image Frame */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950 p-4 flex items-center justify-center border-b border-white/10">
            <img
              src={cert.image}
              alt={cert.title}
              className="max-h-full max-w-full object-contain rounded-xl shadow-lg border border-white/10"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Verified Credential</span>
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-1">
                <span>Issuer: {cert.issuer}</span>
                <span>Year: {cert.issueDate}</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                {cert.title}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Credential ID: <span className="text-cyan-300">{cert.credentialId}</span>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {cert.description}
            </p>

            {/* Skills Validated */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Core Skills Validated
              </h4>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10"
              >
                Close
              </button>

              {cert.pdfUrl && (
                <a
                  href={cert.pdfUrl}
                  download={cert.pdfUrl.split('/').pop()}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 flex items-center gap-1.5 transition-colors"
                >
                  <span>Download PDF</span>
                </a>
              )}

              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
