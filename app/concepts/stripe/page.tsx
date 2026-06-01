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
  return <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)", transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` }}>{children}</div>
}

const translations = {
  ru: {
    dir: "ltr" as const,
    nav: { about: "О нас", routes: "Маршруты", pricing: "Тарифы", reviews: "Отзывы", login: "Войти", order: "Заказать" },
    hero: { badge: "Трансферы по Израилю", title: "Платите ", titleHighlight: "только за поездку", subtitle: "Прозрачное ценообразование. Фиксированная стоимость до начала поездки.", from: "Откуда", to: "Куда", date: "Дата", time: "Время", calculate: "Рассчитать стоимость" },
    pricing: {
      title: "Простые и понятные тарифы", cards: [
        { name: "Дневной", price: "Базовый", desc: "06:00 - 21:00", features: ["Фикс цена", "Кондиционер", "Багаж включён"] },
        { name: "Ночной", price: "+25%", desc: "21:00 - 06:00", features: ["Всё из дневного", "Ночная надбавка", "Приоритет"] },
        { name: "Шаббат", price: "+25%", desc: "Пт вечер - Сб", features: ["Всё из дневного", "Праздничный тариф", "Без отмен"] },
      ]
    },
    features: [
      { icon: "💳", title: "Карта или наличные" },
      { icon: "📍", title: "Трек на карте" },
      { icon: "💬", title: "WhatsApp связь" },
      { icon: "✈️", title: "Аэропорт 24/7" },
    ],
    reviews: {
      title: "Нам доверяют", items: [
        { text: "Пользуюсь уже год. Ни разу не подвели!", name: "Алексей М.", role: "Бизнесмен" },
        { text: "Отличный сервис, рекомендую всем!", name: "Мария К.", role: "Туристка" },
        { text: "Лучшее такси в Израиле по соотношению цена/качество.", name: "Дмитрий С.", role: "Репатриант" },
      ]
    },
    faq: {
      title: "Вопросы и ответы", items: [
        { q: "Как оплатить поездку?", a: "Картой или наличными водителю." },
        { q: "Можно заказать заранее?", a: "Да, укажите дату и время." },
        { q: "Есть детское кресло?", a: "Да, укажите при заказе." },
      ]
    },
    cta: { title: "Начните экономить сегодня", btn: "Заказать поездку" },
    footer: { rights: "Все права защищены" },
    map: { price: "Стоимость", km: "км" },
  },
  en: {
    dir: "ltr" as const,
    nav: { about: "About", routes: "Routes", pricing: "Pricing", reviews: "Reviews", login: "Login", order: "Book" },
    hero: { badge: "Israel Transfers", title: "Pay ", titleHighlight: "only for the ride", subtitle: "Transparent pricing. Fixed cost before the trip.", from: "From", to: "To", date: "Date", time: "Time", calculate: "Calculate price" },
    pricing: {
      title: "Simple and clear pricing", cards: [
        { name: "Day", price: "Base", desc: "06:00 - 21:00", features: ["Fixed price", "AC included", "Luggage included"] },
        { name: "Night", price: "+25%", desc: "21:00 - 06:00", features: ["All from day", "Night surcharge", "Priority"] },
        { name: "Shabbat", price: "+25%", desc: "Fri eve - Sat", features: ["All from day", "Holiday rate", "No cancellations"] },
      ]
    },
    features: [
      { icon: "💳", title: "Card or cash" },
      { icon: "📍", title: "Track on map" },
      { icon: "💬", title: "WhatsApp contact" },
      { icon: "✈️", title: "Airport 24/7" },
    ],
    reviews: {
      title: "Trusted by many", items: [
        { text: "Using for a year. Never let me down!", name: "Alex M.", role: "Businessman" },
        { text: "Great service, recommend to everyone!", name: "Maria K.", role: "Tourist" },
        { text: "Best taxi in Israel for value.", name: "Dmitry S.", role: "Expat" },
      ]
    },
    faq: {
      title: "FAQ", items: [
        { q: "How to pay?", a: "Card or cash to driver." },
        { q: "Can I book ahead?", a: "Yes, specify date and time." },
        { q: "Child seat available?", a: "Yes, mention when booking." },
      ]
    },
    cta: { title: "Start saving today", btn: "Book a ride" },
    footer: { rights: "All rights reserved" },
    map: { price: "Price", km: "km" },
  },
  he: {
    dir: "rtl" as const,
    nav: { about: "אודות", routes: "מסלולים", pricing: "מחירים", reviews: "ביקורות", login: "התחבר", order: "הזמן" },
    hero: { badge: "הסעות בישראל", title: "שלם ", titleHighlight: "רק על הנסיעה", subtitle: "תמחור שקוף. מחיר קבוע לפני הנסיעה.", from: "מאיפה", to: "לאן", date: "תאריך", time: "שעה", calculate: "חשב מחיר" },
    pricing: {
      title: "תמחור פשוט וברור", cards: [
        { name: "יום", price: "בסיס", desc: "06:00 - 21:00", features: ["מחיר קבוע", "מזגן כלול", "מזוודות כלול"] },
        { name: "לילה", price: "+25%", desc: "21:00 - 06:00", features: ["הכל מיום", "תוספת לילה", "עדיפות"] },
        { name: "שבת", price: "+25%", desc: "שישי ערב - שבת", features: ["הכל מיום", "תעריף חג", "ללא ביטולים"] },
      ]
    },
    features: [
      { icon: "💳", title: "כרטיס או מזומן" },
      { icon: "📍", title: "מעקב במפה" },
      { icon: "💬", title: "קשר WhatsApp" },
      { icon: "✈️", title: "שדה תעופה 24/7" },
    ],
    reviews: {
      title: "סומכים עלינו", items: [
        { text: "משתמש כבר שנה. אף פעם לא אכזבו!", name: "אלכס מ.", role: "איש עסקים" },
        { text: "שירות מעולה, ממליץ לכולם!", name: "מריה כ.", role: "תיירת" },
        { text: "המונית הטובה בישראל ביחס מחיר/איכות.", name: "דמיטרי ס.", role: "עולה חדש" },
      ]
    },
    faq: {
      title: "שאלות ותשובות", items: [
        { q: "איך משלמים?", a: "כרטיס או מזומן לנהג." },
        { q: "אפשר להזמין מראש?", a: "כן, ציין תאריך ושעה." },
        { q: "יש כיסא ילדים?", a: "כן, ציין בהזמנה." },
      ]
    },
    cta: { title: "התחל לחסוך היום", btn: "הזמן נסיעה" },
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

export default function StripeConcept() {
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
    <div className="min-h-screen bg-[#0A2540]" dir={t.dir} style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* WhatsApp Float */}
      <a href="https://wa.me/972501234567" target="_blank" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
      </a>

      {/* Nav */}
      <Navbar
        lang={lang}
        setLang={setLang}
        variant="stripe"
        translations={t}
        loginPath="/concepts/apple/login"
      />

      {/* Hero */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 text-cyan-400 rounded-full text-sm mb-6">{t.hero.badge}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t.hero.title}<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg text-white/60 mb-8">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              {t.features.map((f, i) => (
                <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm text-white/80">
                  {f.icon} {f.title}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 uppercase block mb-1">{t.hero.from}</label>
                  <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {cityList.filter(c => c.id !== toCity).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase block mb-1">{t.hero.to}</label>
                  <select value={toCity} onChange={(e) => setToCity(e.target.value)} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {cityList.filter(c => c.id !== fromCity).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
                <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="p-3 bg-gray-50 rounded-lg border border-gray-200" />
              </div>
              <button onClick={scrollToMap} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-[1.02]">
                {t.hero.calculate} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={mapRef} className="w-full h-[400px] rounded-2xl overflow-hidden">
            <MapComponent from={fromCityData.coords} to={toCityData.coords} fromName={fromCityData.name} toName={toCityData.name} />
          </div>
          {showResult && (
            <AnimatedSection>
              <div className="mt-6 p-6 bg-white rounded-2xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{fromCityData.name} → {toCityData.name}</p>
                  <p className="text-sm text-gray-500">{distance} {t.map.km}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">₪{price}</p>
                  <a href={`https://wa.me/972501234567?text=${encodeURIComponent(`${fromCityData.name} → ${toCityData.name}`)}`} target="_blank" className="inline-block mt-2 px-6 py-2 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#20BD5A]">
                    WhatsApp
                  </a>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.pricing.title}</h2></AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {t.pricing.cards.map((card, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className={`p-8 rounded-2xl border-2 ${i === 1 ? "border-cyan-500 bg-gradient-to-b from-cyan-50 to-white" : "border-gray-200"}`}>
                  <h3 className="text-xl font-bold mb-2">{card.name}</h3>
                  <p className="text-3xl font-bold text-cyan-600 mb-2">{card.price}</p>
                  <p className="text-sm text-gray-500 mb-6">{card.desc}</p>
                  <ul className="space-y-3">
                    {card.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <span className="text-cyan-500">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.reviews.title}</h2></AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {t.reviews.items.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="p-6 bg-white rounded-2xl shadow">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}</div>
                  <p className="text-gray-600 mb-4">&ldquo;{r.text}&rdquo;</p>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.faq.title}</h2></AnimatedSection>
          <div className="space-y-4">
            {t.faq.items.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="border rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-4 flex justify-between items-center font-medium bg-gray-50 hover:bg-gray-100">
                    {faq.q}
                    <span className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? "100px" : "0", opacity: openFaq === i ? 1 : 0, transition: "all 0.3s" }} className="overflow-hidden">
                    <p className="p-4 text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0A2540]">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">{t.cta.title}</h2>
            <a href="https://wa.me/972501234567" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:scale-105 transition-transform">
              {t.cta.btn} →
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#0A2540] border-t border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-white/50">
          <span className="font-semibold text-white">RideFlow</span>
          <p>© 2026. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}
