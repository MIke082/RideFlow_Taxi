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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useInView()
  return (
    <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: `all 0.5s ease ${delay}s` }}>
      {children}
    </div>
  )
}

const translations = {
  ru: {
    dir: "ltr" as const,
    nav: { about: "О нас", routes: "Маршруты", pricing: "Тарифы", reviews: "Отзывы", login: "Войти", order: "Заказать" },
    hero: { badge: "Трансфер по Израилю", title: "Поездки по Израилю", subtitle: "Фиксированная цена. Без сюрпризов.", from: "Откуда", to: "Куда", date: "Дата", time: "Время", calculate: "Рассчитать" },
    features: [
      { icon: "💰", title: "Фиксированная цена", desc: "Знаете стоимость до поездки" },
      { icon: "🕐", title: "24/7", desc: "Работаем круглосуточно" },
      { icon: "✡️", title: "Шаббат +25%", desc: "Работаем в праздники" },
      { icon: "✈️", title: "Аэропорт", desc: "Встреча с табличкой" },
    ],
    pricing: { title: "Тарифы", day: "День", night: "Ночь +25%", shabbat: "Шаббат +25%", airport: "Аэропорт фикс" },
    reviews: { title: "Отзывы", items: [
      { text: "Отличный сервис! Водитель приехал вовремя.", name: "Михаил", rating: 5 },
      { text: "Пользуюсь регулярно. Всегда довольна.", name: "Анна", rating: 5 },
      { text: "Удобно и быстро. Рекомендую!", name: "Давид", rating: 5 },
    ]},
    faq: { title: "Вопросы", items: [
      { q: "Как заказать?", a: "Выберите маршрут или напишите в WhatsApp" },
      { q: "Оплата картой?", a: "Да, принимаем Visa, MasterCard, наличные" },
      { q: "Работаете в шаббат?", a: "Да, 24/7 с надбавкой +25%" },
    ]},
    whatsapp: { title: "Вопросы?", btn: "WhatsApp" },
    footer: { rights: "Все права защищены" },
    map: { price: "Цена", km: "км", min: "мин" },
  },
  en: {
    dir: "ltr" as const,
    nav: { about: "About", routes: "Routes", pricing: "Pricing", reviews: "Reviews", login: "Login", order: "Book" },
    hero: { badge: "Israel Transfers", title: "Rides in Israel", subtitle: "Fixed price. No surprises.", from: "From", to: "To", date: "Date", time: "Time", calculate: "Calculate" },
    features: [
      { icon: "💰", title: "Fixed price", desc: "Know cost before ride" },
      { icon: "🕐", title: "24/7", desc: "Always available" },
      { icon: "✡️", title: "Shabbat +25%", desc: "Holiday service" },
      { icon: "✈️", title: "Airport", desc: "Meet & greet" },
    ],
    pricing: { title: "Pricing", day: "Day", night: "Night +25%", shabbat: "Shabbat +25%", airport: "Airport fixed" },
    reviews: { title: "Reviews", items: [
      { text: "Great service! Driver arrived on time.", name: "Michael", rating: 5 },
      { text: "Use regularly. Always satisfied.", name: "Anna", rating: 5 },
      { text: "Convenient and fast. Recommend!", name: "David", rating: 5 },
    ]},
    faq: { title: "FAQ", items: [
      { q: "How to book?", a: "Select route or write to WhatsApp" },
      { q: "Card payment?", a: "Yes, Visa, MasterCard, cash" },
      { q: "Work on Shabbat?", a: "Yes, 24/7 with +25% surcharge" },
    ]},
    whatsapp: { title: "Questions?", btn: "WhatsApp" },
    footer: { rights: "All rights reserved" },
    map: { price: "Price", km: "km", min: "min" },
  },
  he: {
    dir: "rtl" as const,
    nav: { about: "אודות", routes: "מסלולים", pricing: "מחירים", reviews: "ביקורות", login: "התחבר", order: "הזמן" },
    hero: { badge: "הסעות בישראל", title: "נסיעות בישראל", subtitle: "מחיר קבוע. בלי הפתעות.", from: "מאיפה", to: "לאן", date: "תאריך", time: "שעה", calculate: "חשב" },
    features: [
      { icon: "💰", title: "מחיר קבוע", desc: "דע עלות לפני נסיעה" },
      { icon: "🕐", title: "24/7", desc: "תמיד זמינים" },
      { icon: "✡️", title: "שבת +25%", desc: "שירות בחגים" },
      { icon: "✈️", title: "שדה תעופה", desc: "קבלת פנים" },
    ],
    pricing: { title: "מחירים", day: "יום", night: "לילה +25%", shabbat: "שבת +25%", airport: "שדה תעופה קבוע" },
    reviews: { title: "ביקורות", items: [
      { text: "שירות מעולה! הנהג הגיע בזמן.", name: "מיכאל", rating: 5 },
      { text: "משתמשת באופן קבוע. תמיד מרוצה.", name: "אנה", rating: 5 },
      { text: "נוח ומהיר. ממליץ!", name: "דוד", rating: 5 },
    ]},
    faq: { title: "שאלות", items: [
      { q: "איך מזמינים?", a: "בחר מסלול או כתוב ל-WhatsApp" },
      { q: "תשלום בכרטיס?", a: "כן, Visa, MasterCard, מזומן" },
      { q: "עובדים בשבת?", a: "כן, 24/7 עם תוספת +25%" },
    ]},
    whatsapp: { title: "שאלות?", btn: "WhatsApp" },
    footer: { rights: "כל הזכויות שמורות" },
    map: { price: "מחיר", km: "ק״מ", min: "דק׳" },
  },
}

const cities = {
  ru: [
    { id: "jerusalem", name: "Иерусалим", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "Тель-Авив", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "Хайфа", coords: [32.7940, 34.9896] as [number, number] },
    { id: "eilat", name: "Эйлат", coords: [29.5577, 34.9519] as [number, number] },
    { id: "bengurion", name: "Бен-Гурион", coords: [32.0055, 34.8854] as [number, number] },
  ],
  en: [
    { id: "jerusalem", name: "Jerusalem", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "Tel Aviv", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "Haifa", coords: [32.7940, 34.9896] as [number, number] },
    { id: "eilat", name: "Eilat", coords: [29.5577, 34.9519] as [number, number] },
    { id: "bengurion", name: "Ben Gurion", coords: [32.0055, 34.8854] as [number, number] },
  ],
  he: [
    { id: "jerusalem", name: "ירושלים", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "תל אביב", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "חיפה", coords: [32.7940, 34.9896] as [number, number] },
    { id: "eilat", name: "אילת", coords: [29.5577, 34.9519] as [number, number] },
    { id: "bengurion", name: "נתב״ג", coords: [32.0055, 34.8854] as [number, number] },
  ],
}

const priceMatrix: Record<string, Record<string, number>> = {
  jerusalem: { telaviv: 245, haifa: 450, eilat: 850, bengurion: 180 },
  telaviv: { jerusalem: 245, haifa: 320, eilat: 950, bengurion: 120 },
  haifa: { jerusalem: 450, telaviv: 320, eilat: 1100, bengurion: 380 },
  eilat: { jerusalem: 850, telaviv: 950, haifa: 1100, bengurion: 900 },
  bengurion: { jerusalem: 180, telaviv: 120, haifa: 380, eilat: 900 },
}

export default function UberConcept() {
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

  const swapCities = () => { setFromCity(toCity); setToCity(fromCity) }
  useEffect(() => setShowResult(false), [fromCity, toCity])

  return (
    <div className="min-h-screen bg-white" dir={t.dir} style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* WhatsApp Float */}
      <a href="https://wa.me/972501234567" target="_blank" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
      </a>

      {/* Nav */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        variant="uber" 
        translations={t}
        loginPath="/concepts/uber/login"
      />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm mb-4">{t.hero.badge}</span>
            <h1 className="text-5xl md:text-6xl font-black mb-4">{t.hero.title}</h1>
            <p className="text-xl text-gray-400 mb-8">{t.hero.subtitle}</p>
            <div className="grid grid-cols-2 gap-4">
              {t.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-sm text-gray-400">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white text-black rounded-2xl p-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase">{t.hero.from}</label>
                <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="w-full p-3 bg-gray-100 rounded-lg mt-1">
                  {cityList.filter(c => c.id !== toCity).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <button onClick={swapCities} className="mx-auto block p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
              </button>
              <div>
                <label className="text-xs text-gray-500 uppercase">{t.hero.to}</label>
                <select value={toCity} onChange={(e) => setToCity(e.target.value)} className="w-full p-3 bg-gray-100 rounded-lg mt-1">
                  {cityList.filter(c => c.id !== fromCity).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 uppercase">{t.hero.date}</label>
                  <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-3 bg-gray-100 rounded-lg mt-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">{t.hero.time}</label>
                  <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="w-full p-3 bg-gray-100 rounded-lg mt-1" />
                </div>
              </div>
              <button onClick={scrollToMap} className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all hover:scale-[1.02] active:scale-[0.98]">
                {t.hero.calculate}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div ref={mapRef} className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <MapComponent from={fromCityData.coords} to={toCityData.coords} fromName={fromCityData.name} toName={toCityData.name} />
          </div>
          {showResult && (
            <AnimatedSection>
              <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">{fromCityData.name} → {toCityData.name}</p>
                  <p className="text-sm text-gray-400">{distance} {t.map.km}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black">₪{price}</p>
                  <a href={`https://wa.me/972501234567?text=${encodeURIComponent(`${fromCityData.name} → ${toCityData.name}`)}`} target="_blank" className="inline-block mt-2 px-6 py-2 bg-[#25D366] text-white rounded-full font-semibold hover:bg-[#20BD5A]">
                    {t.whatsapp.btn}
                  </a>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-black text-center mb-8">{t.pricing.title}</h2></AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: t.pricing.day, value: "100%", bg: "bg-gray-100" },
              { label: t.pricing.night, value: "+25%", bg: "bg-gray-900 text-white" },
              { label: t.pricing.shabbat, value: "+25%", bg: "bg-amber-100" },
              { label: t.pricing.airport, value: "FIX", bg: "bg-blue-100" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`p-6 rounded-2xl ${item.bg} text-center`}>
                  <p className="text-sm opacity-70">{item.label}</p>
                  <p className="text-2xl font-black mt-2">{item.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-black text-center mb-8">{t.reviews.title}</h2></AnimatedSection>
          <div className="grid md:grid-cols-3 gap-4">
            {t.reviews.items.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-6 bg-white rounded-2xl shadow">
                  <div className="flex gap-1 mb-3">{[...Array(r.rating)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}</div>
                  <p className="text-gray-600 mb-4">&ldquo;{r.text}&rdquo;</p>
                  <p className="font-semibold">{r.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-black text-center mb-8">{t.faq.title}</h2></AnimatedSection>
          <div className="space-y-3">
            {t.faq.items.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-4 flex justify-between items-center font-semibold">
                    {faq.q}
                    <span className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? "100px" : "0", opacity: openFaq === i ? 1 : 0, transition: "all 0.3s" }} className="overflow-hidden">
                    <p className="px-4 pb-4 text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black text-white text-center">
        <p className="font-black text-xl mb-2">RideFlow</p>
        <p className="text-sm text-gray-400">© 2026. {t.footer.rights}</p>
      </footer>
    </div>
  )
}
