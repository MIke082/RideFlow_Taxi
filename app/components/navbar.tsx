"use client"

import { useState } from "react"
import Link from "next/link"

type Lang = "ru" | "en" | "he"

interface NavbarProps {
  lang: Lang
  setLang: (lang: Lang) => void
  variant?: "apple" | "uber" | "saas" | "stripe" | "bold"
  translations: {
    nav: {
      about: string
      routes: string
      pricing: string
      reviews: string
      login: string
    }
    dir: string
  }
  loginPath?: string
}

const langLabels = {
  ru: "Русский",
  en: "English", 
  he: "עברית"
}

export default function Navbar({ lang, setLang, variant = "apple", translations: t, loginPath = "/concepts/apple/login" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)

  const variants = {
    apple: {
      bg: "bg-[#FBFBFD]/80",
      text: "text-[#1D1D1F]",
      textMuted: "text-[#1D1D1F]/80",
      accent: "text-[#0071E3]",
      accentBg: "bg-[#0071E3]",
      logo: "bg-[#0071E3]",
      border: "border-black/5",
    },
    uber: {
      bg: "bg-black/90",
      text: "text-white",
      textMuted: "text-white/80",
      accent: "text-white",
      accentBg: "bg-white text-black",
      logo: "bg-white",
      border: "border-white/10",
    },
    saas: {
      bg: "bg-[#0F0A1F]/80",
      text: "text-white",
      textMuted: "text-white/70",
      accent: "text-violet-400",
      accentBg: "bg-violet-600",
      logo: "bg-violet-500",
      border: "border-white/10",
    },
    stripe: {
      bg: "bg-[#0A2540]/90",
      text: "text-white",
      textMuted: "text-white/70",
      accent: "text-cyan-400",
      accentBg: "bg-gradient-to-r from-cyan-500 to-blue-500",
      logo: "bg-gradient-to-r from-cyan-400 to-blue-500",
      border: "border-white/10",
    },
    bold: {
      bg: "bg-[#FCD34D]/95",
      text: "text-black",
      textMuted: "text-black/70",
      accent: "text-black",
      accentBg: "bg-black text-[#FCD34D]",
      logo: "bg-black",
      border: "border-black/10",
    },
  }

  const v = variants[variant]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${v.bg} backdrop-blur-xl border-b ${v.border}`} dir={t.dir}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${v.logo}`}></span>
            <span className={`text-xl font-bold ${v.text}`}>RideFlow</span>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 text-sm ${v.textMuted}`}>
            <a href="#about" className={`hover:${v.accent} transition-colors`}>{t.nav.about}</a>
            <a href="#map" className={`hover:${v.accent} transition-colors`}>{t.nav.routes}</a>
            <a href="#pricing" className={`hover:${v.accent} transition-colors`}>{t.nav.pricing}</a>
            <a href="#reviews" className={`hover:${v.accent} transition-colors`}>{t.nav.reviews}</a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm ${v.textMuted} hover:bg-black/5 transition-colors`}
              >
                <span className="hidden sm:inline">{langLabels[lang]}</span>
                <span className="sm:hidden">{lang.toUpperCase()}</span>
                <svg className={`w-3 h-3 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />
                  <div className={`absolute ${t.dir === "rtl" ? "left-0" : "right-0"} top-full mt-1 py-1 bg-white rounded-lg shadow-xl border border-black/10 z-50 min-w-[120px]`}>
                    {(["ru", "en", "he"] as Lang[]).map(l => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangDropdownOpen(false); }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors flex items-center justify-between ${lang === l ? "bg-gray-50 font-medium" : ""}`}
                      >
                        <span className="text-gray-900">{langLabels[l]}</span>
                        {lang === l && <span className="text-[#0071E3]">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Login Button */}
            <Link 
              href={loginPath}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm ${v.accent} font-medium hover:bg-black/5 rounded-full transition-colors`}
            >
              {t.nav.login}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${v.textMuted} hover:bg-black/5`}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${v.bg} border-t ${v.border} px-4 py-4`}>
            <div className="flex flex-col gap-3">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl ${v.textMuted} hover:bg-black/5 transition-colors`}>{t.nav.about}</a>
              <a href="#map" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl ${v.textMuted} hover:bg-black/5 transition-colors`}>{t.nav.routes}</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl ${v.textMuted} hover:bg-black/5 transition-colors`}>{t.nav.pricing}</a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl ${v.textMuted} hover:bg-black/5 transition-colors`}>{t.nav.reviews}</a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
