import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const navConfig = [
  { key: 'about', pathSuffix: '/about' },
  { key: 'model', pathSuffix: '/model' },
  { key: 'services', pathSuffix: '/services' },
];

const translations = {
  es: { about: 'NOSOTROS', model: 'MODELO', services: 'SERVICIOS' },
  en: { about: 'ABOUT', model: 'MODEL', services: 'SERVICES' },
  pt: { about: 'SOBRE', model: 'MODELO', services: 'SERVIÇOS' },
};

function getLang() {
  if (typeof window !== 'undefined') {
    const locale = window.location.pathname.split('/')[1];
    if (['es', 'en', 'pt'].includes(locale)) return locale;
  }
  return 'es';
}

function MenuModal({ isOpen, onClose }) {
  const lang = getLang();
  const t = translations[lang] || translations.es;

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-[85%] max-w-sm mx-auto animate-[modalIn_0.35s_ease-out]">
        <div className="bg-primary border border-white/15 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Close button */}
          <div className="flex justify-end p-4 pb-0">
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer"
              aria-label="Cerrar menú"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-6 pb-8 pt-2">
            <div className="flex flex-col gap-1">
              {navConfig.map((item, index) => (
                <a
                  key={item.key}
                  href={`/${lang}${item.pathSuffix}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-white/8 transition-all duration-300"
                  style={{
                    animation: `slideIn 0.35s ease-out ${(index + 1) * 70}ms both`,
                  }}
                >
                  {/* Decorative dot */}
                  <span className="w-2 h-2 rounded-full bg-tertiary/60 group-hover:bg-tertiary group-hover:shadow-[0_0_8px_rgba(128,230,210,0.4)] transition-all duration-300 shrink-0" />

                  <span className="font-montserrat font-bold text-lg tracking-[0.15em] text-white/85 group-hover:text-white transition-colors duration-300">
                    {t[item.key]}
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-[5px] cursor-pointer focus:outline-none"
        aria-label="Abrir menú"
      >
        <span className="block w-5 h-[2px] bg-white rounded-full" />
        <span className="block w-5 h-[2px] bg-white rounded-full" />
        <span className="block w-5 h-[2px] bg-white rounded-full" />
      </button>

      {/* Modal via Portal */}
      <MenuModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
