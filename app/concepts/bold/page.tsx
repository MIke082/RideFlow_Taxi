"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/app/components/navbar"

const MapComponent = dynamic(() => import("../apple/map"), { ssr: false })

type Lang = "ru" | "en" | "he"

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true) }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useInView()
  return <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0) rotate(0)" : "translateY(30px)", transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s` }}>{children}</div>
}

const translations = {
  ru: {
    dir: "ltr" as const,
    nav: { about: "О нас", routes: "Маршруты", pricing: "Тарифы", reviews: "Отзывы", login: "Войти", order: "Заказать" },
    hero: { badge: "Трансферы нового поколения", title: "Поездки должны быть простыми", subtitle: "Фиксированная цена. Без счётчика. Поехали!", from: "Откуда", to: "Куда", date: "Когда", time: "Во сколько", calculate: "Узнать цену" },
    stats: [
      { value: "50K+", label: "Поездок" },
      { value: "4.9", label: "Рейтинг" },
      { value: "24/7", label: "Работаем" },
      { value: "100%", label: "Фикс цена" },
    ],
    features: { title: "Всё включено", items: [
      { icon: "💰", title: "Честная цена", desc: "Знаете стоимость заранее" },
      { icon: "🚗", title: "Комфорт", desc: "Чистые авто с кондиционером" },
      { icon: "💬", title: "Поддержка", desc: "WhatsApp связь 24/7" },
      { icon: "✈️", title: "Аэропорт", desc: "Встреча с табличкой" },
    ]},
    pricing: { title: "Тарифы", day: "День", night: "Ночь +25%", shabbat: "Шаббат +25%" },
    reviews: { title: "Отзывы", items: [
      { text: "Супер сервис! Теперь только RideFlow!", name: "Михаил", city: "Иерусалим" },
      { text: "Быстро, удобно, по честной цене.", name: "Анна", city: "Тель-Авив" },
      { text: "Лучший трансфер в аэропорт!", name: "Давид", city: "Хайфа" },
    ]},
    faq: { title: "FAQ", items: [
      { q: "Как заказать?", a: "На сайте или в WhatsApp" },
      { q: "Как оплатить?", a: "Картой или наличными" },
      { q: "Работаете в шаббат?", a: "Да, +25%" },
    ]},
    cta: { title: "Поехали?", btn: "Заказать в WhatsApp" },
    footer: { rights: "Все права защищены" },
    map: { price: "Цена", km: "км" },
  },
  en: {
    dir: "ltr" as const,
    nav: { about: "About", routes: "Routes", pricing: "Pricing", reviews: "Reviews", login: "Login", order: "Book" },
    hero: { badge: "Next-gen transfers", title: "Rides should be simple", subtitle: "Fixed price. No meter. Let's go!", from: "From", to: "To", date: "When", time: "What time", calculate: "Get price" },
    stats: [
      { value: "50K+", label: "Rides" },
      { value: "4.9", label: "Rating" },
      { value: "24/7", label: "Available" },
      { value: "100%", label: "Fixed price" },
    ],
    features: { title: "All included", items: [
      { icon: "💰", title: "Fair price", desc: "Know cost upfront" },
      { icon: "🚗", title: "Comfort", desc: "Clean cars with AC" },
      { icon: "💬", title: "Support", desc: "WhatsApp 24/7" },
      { icon: "✈️", title: "Airport", desc: "Meet & greet" },
    ]},
    pricing: { title: "Pricing", day: "Day", night: "Night +25%", shabbat: "Shabbat +25%" },
    reviews: { title: "Reviews", items: [
      { text: "Super service! Only RideFlow now!", name: "Michael", city: "Jerusalem" },
      { text: "Fast, convenient, fair price.", name: "Anna", city: "Tel Aviv" },
      { text: "Best airport transfer!", name: "David", city: "Haifa" },
    ]},
    faq: { title: "FAQ", items: [
      { q: "How to book?", a: "On site or WhatsApp" },
      { q: "How to pay?", a: "Card or cash" },
      { q: "Work on Shabbat?", a: "Yes, +25%" },
    ]},
    cta: { title: "Let's go?", btn: "Book on WhatsApp" },
    footer: { rights: "All rights reserved" },
    map: { price: "Price", km: "km" },
  },
  he: {
    dir: "rtl" as const,
    nav: { about: "אודות", routes: "מסלולים", pricing: "מחירים", reviews: "ביקורות", login: "התחבר", order: "הזמן" },
    hero: { badge: "הסעות מהדור הבא", title: "נסיעות צריכות להיות פשוטות", subtitle: "מחיר קבוע. בלי מונה. יאללה!", from: "מאיפה", to: "לאן", date: "מתי", time: "באיזו שעה", calculate: "קבל מחיר" },
    stats: [
      { value: "50K+", label: "נסיעות" },
      { value: "4.9", label: "דירוג" },
      { value: "24/7", label: "זמינים" },
      { value: "100%", label: "מחיר קבוע" },
    ],
    features: { title: "הכל כלול", items: [
      { icon: "💰", title: "מחיר הוגן", desc: "דע עלות מראש" },
      { icon: "🚗", title: "נוחות", desc: "מכוניות נקיות עם מזגן" },
      { icon: "💬", title: "תמיכה", desc: "WhatsApp 24/7" },
      { icon: "✈️", title: "שדה תעופה", desc: "קבלת פנים" },
    ]},
    pricing: { title: "מחירים", day: "יום", night: "לילה +25%", shabbat: "שבת +25%" },
    reviews: { title: "ביקורות", items: [
      { text: "שירות סופר! רק RideFlow עכשיו!", name: "מיכאל", city: "ירושלים" },
      { text: "מהיר, נוח, מחיר הוגן.", name: "אנה", city: "תל אביב" },
      { text: "הסעה הכי טובה לשדה תעופה!", name: "דוד", city: "חיפה" },
    ]},
    faq: { title: "שאלות", items: [
      { q: "איך מזמינים?", a: "באתר או ב-WhatsApp" },
      { q: "איך משלמים?", a: "כרטיס או מזומן" },
      { q: "עובדים בשבת?", a: "כן, +25%" },
    ]},
    cta: { title: "יאללה?", btn: "הזמן ב-WhatsApp" },
    footer: { rights: "כל הזכויות שמורות" },
    map: { price: "מחיר", km: "ק״מ" },
  },
}

const cities = {
  ru: [
    { id: "jerusalem", name: "Иерусалим", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "Тель-Авив", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "Хайфа", coords: [32.7940, 34.9896] as [number, number] },
    { id: "bengurion", name: "Бен-Гурион", coords: [32.0055, 34.8854] as [number, number] },
  ],
  en: [
    { id: "jerusalem", name: "Jerusalem", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "Tel Aviv", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "Haifa", coords: [32.7940, 34.9896] as [number, number] },
    { id: "bengurion", name: "Ben Gurion", coords: [32.0055, 34.8854] as [number, number] },
  ],
  he: [
    { id: "jerusalem", name: "ירושלים", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "תל אביב", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "חיפה", coords: [32.7940, 34.9896] as [number, number] },
    { id: "bengurion", name: "נתב״ג", coords: [32.0055, 34.8854] as [number, number] },
  ],
}

const priceMatrix: Record<string, Record<string, number>> = {
  jerusalem: { telaviv: 245, haifa: 450, bengurion: 180 },
  telaviv: { jerusalem: 245, haifa: 320, bengurion: 120 },
  haifa: { jerusalem: 450, telaviv: 320, bengurion: 380 },
  bengurion: { jerusalem: 180, telaviv: 120, haifa: 380 },
}

export default function BoldConcept() {
  const [lang, setLang] = useState<Lang>("ru")
  const [fromCity, setFromCity] = useState("jerusalem")
  const [toCity, setToCity] = useState("telaviv")
  const [showResult, setShowResult] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const mapRef = useRef<HTMLDivElement>(null)

  const scrollToMap = () => {
    setShowResult(true)
    setTimeout(() => mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
  }

  const t = translations[lang]
  const cityList = cities[lang]
  const fromCityData = cityList.find(c => c.id === fromCity)!
  const toCityData = cityList.find(c => c.id === toCity)!
  const price = priceMatrix[fromCity]?.[toCity] || 0
  const distance = Math.round(Math.sqrt(Math.pow((fromCityData.coords[0] - toCityData.coords[0]) * 111, 2) + Math.pow((fromCityData.coords[1] - toCityData.coords[1]) * 85, 2)))

  useEffect(() => setShowResult(false), [fromCity, toCity])

  return (
    <div className="min-h-screen bg-[#FEF3C7]" dir={t.dir} style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* WhatsApp Float */}
      <a href="https://wa.me/972501234567" target="_blank" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
      </a>

      {/* Nav */}
      <Navbar
        lang={lang} 
        setLang={setLang} 
        variant="bold" 
        translations={t}
        loginPath="/concepts/bold/login"
      />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm font-bold mb-6 animate-bounce">{t.hero.badge}</span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-xl text-black/60 mb-8">{t.hero.subtitle}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {t.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-xs text-black/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Booking Card */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-black">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold uppercase">{t.hero.from}</label>
                <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="w-full p-4 bg-[#FEF3C7] rounded-xl mt-1 font-medium border-2 border-black">
                  {cityList.filter(c => c.id !== toCity).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold uppercase">{t.hero.to}</label>
                <select value={toCity} onChange={(e) => setToCity(e.target.value)} className="w-full p-4 bg-[#FEF3C7] rounded-xl mt-1 font-medium border-2 border-black">
                  {cityList.filter(c => c.id !== fromCity).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-bold uppercase">{t.hero.date}</label>
                  <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-4 bg-[#FEF3C7] rounded-xl mt-1 border-2 border-black" />
                </div>
                <div>
                  <label className="text-sm font-bold uppercase">{t.hero.time}</label>
                  <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full p-4 bg-[#FEF3C7] rounded-xl mt-1 border-2 border-black" />
                </div>
              </div>
              <button onClick={scrollToMap} className="w-full py-5 bg-black text-white text-lg font-black rounded-xl hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]">
                {t.hero.calculate}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={mapRef} className="w-full h-[400px] rounded-3xl overflow-hidden border-4 border-black">
            <MapComponent from={fromCityData.coords} to={toCityData.coords} fromName={fromCityData.name} toName={toCityData.name} />
          </div>
          {showResult && (
            <AnimatedSection>
              <div className="mt-6 p-8 bg-white rounded-3xl border-4 border-black flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-black">{fromCityData.name} → {toCityData.name}</p>
                  <p className="text-black/60">{distance} {t.map.km}</p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-black">₪{price}</p>
                  <a href={`https://wa.me/972501234567?text=${encodeURIComponent(`${fromCityData.name} → ${toCityData.name}`)}`} target="_blank" className="inline-block mt-3 px-8 py-3 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#20BD5A] hover:scale-105 transition-all">
                    WhatsApp
                  </a>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection><h2 className="text-4xl font-black text-center mb-12">{t.features.title}</h2></AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.features.items.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-6 bg-white rounded-2xl border-4 border-black text-center hover:-rotate-2 hover:scale-105 transition-all">
                  <span className="text-4xl mb-4 block">{f.icon}</span>
                  <h3 className="font-black mb-1">{f.title}</h3>
                  <p className="text-sm text-black/60">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection><h2 className="text-4xl font-black text-center mb-12">{t.pricing.title}</h2></AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: t.pricing.day, value: "100%", bg: "bg-white text-black" },
              { label: t.pricing.night, value: "+25%", bg: "bg-[#FEF3C7] text-black" },
              { label: t.pricing.shabbat, value: "+25%", bg: "bg-amber-500 text-black" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className={`p-8 rounded-2xl ${item.bg} text-center border-4 border-white`}>
                  <p className="text-lg font-bold mb-2">{item.label}</p>
                  <p className="text-4xl font-black">{item.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection><h2 className="text-4xl font-black text-center mb-12">{t.reviews.title}</h2></AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {t.reviews.items.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="p-6 bg-white rounded-2xl border-4 border-black hover:rotate-1 transition-transform">
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_, j) => <span key={j} className="text-amber-500 text-xl">★</span>)}</div>
                  <p className="font-medium mb-4">&ldquo;{r.text}&rdquo;</p>
                  <p className="font-black">{r.name}</p>
                  <p className="text-sm text-black/60">{r.city}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection><h2 className="text-4xl font-black text-center mb-12">{t.faq.title}</h2></AnimatedSection>
          <div className="space-y-4">
            {t.faq.items.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="border-4 border-black rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-4 flex justify-between items-center font-black bg-[#FEF3C7] hover:bg-amber-200">
                    {faq.q}
                    <span className={`text-2xl transition-transform ${openFaq === i ? "rotate-180" : ""}`}>↓</span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? "100px" : "0", opacity: openFaq === i ? 1 : 0, transition: "all 0.3s" }} className="overflow-hidden">
                    <p className="p-4">{faq.a}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center bg-black text-white rounded-3xl p-12 border-4 border-black">
            <h2 className="text-4xl font-black mb-8">{t.cta.title}</h2>
            <a href="https://wa.me/972501234567" target="_blank" className="inline-flex items-center gap-2 px-10 py-5 bg-[#FEF3C7] text-black font-black text-lg rounded-full hover:scale-105 transition-transform">
              {t.cta.btn}
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm">
          <span className="font-black text-xl">RideFlow</span>
          <p>© 2026. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}
