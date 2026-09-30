import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Target, TrendingUp, Bot, Search, BarChart3, 
  ExternalLink, RotateCw, ZoomIn, ShieldCheck 
} from 'lucide-react';
import { certificatesData } from '../data/certificates';
import CertificateModal from './CertificateModal';
import { useLanguage } from '../locales/LanguageContext';

const iconMap = {
  Award, Target, TrendingUp, Bot, Search, BarChart3
};

function FlipCertificateCard({ cert, onOpenModal }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const IconComp = iconMap[cert.badgeIcon] || Award;

  return (
    <div className="perspective-1000 h-[380px] w-full">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full h-full relative transform-style-3d cursor-pointer"
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 backface-hidden glass-panel rounded-3xl p-6 border border-white/10 hover:border-cyan-500/40 flex flex-col justify-between group shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${cert.color}15`, border: `1px solid ${cert.color}40` }}
              >
                <IconComp className="w-6 h-6" style={{ color: cert.color }} />
              </div>
              <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                {cert.issueDate}
              </span>
            </div>

            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
              {cert.issuer}
            </span>
            <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-3">
              {cert.title}
            </h3>

            {/* Thumbnail Preview with Zoom overlay */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(cert);
              }}
              className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10 group/thumb cursor-zoom-in"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 flex items-center justify-center transition-colors">
                <span className="p-2 rounded-full bg-cyan-500/80 text-black shadow-lg">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Front Card Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <button
              onClick={() => setIsFlipped(true)}
              className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>3D Flip for Details</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(cert);
              }}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>View</span>
            </button>
          </div>
        </div>

        {/* BACK FACE (Rotated 180deg) */}
        <div className="absolute inset-0 rotate-y-180 backface-hidden glass-panel bg-[#0b0f19] rounded-3xl p-6 border border-cyan-500/40 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Credential Verification</span>
              </span>
              <button
                onClick={() => setIsFlipped(false)}
                className="p-1 rounded-lg bg-white/5 text-slate-400 hover:text-white"
                aria-label="Flip back"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-slate-300 mb-3">
              <span className="text-slate-400">ID: </span>
              <span className="text-cyan-300">{cert.credentialId}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
              {cert.description}
            </p>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Skills Tested:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.slice(0, 3).map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setIsFlipped(false)}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              &larr; Back
            </button>

            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
            >
              <span>Verify</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  return (
    <section id="certificates" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>{t('cert_tag')}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Professional <span className="gradient-text-purple">Certifications</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {t('cert_desc')}
        </p>
      </div>

      {/* 3D Flip Cards Grid */}
      <div className={`grid grid-cols-1 ${certificatesData.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
        {certificatesData.map((cert) => (
          <FlipCertificateCard
            key={cert.id}
            cert={cert}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {/* Enlarge Modal */}
      <CertificateModal
        cert={selectedCert}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
