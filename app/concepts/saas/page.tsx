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
  return <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: `all 0.5s ease ${delay}s` }}>{children}</div>
}

const translations = {
  ru: {
    dir: "ltr" as const,
    nav: { about: "О нас", routes: "Маршруты", pricing: "Тарифы", reviews: "Отзывы", login: "Войти", order: "Заказать" },
    hero: { badge: "Новое в Израиле", title: "Трансфер который работает", subtitle: "Фиксированная цена до начала поездки. Без счётчика. Без сюрпризов.", from: "Откуда", to: "Куда", date: "Дата", time: "Время", calculate: "Узнать цену" },
    trust: ["Yandex Go", "Gett", "Bolt", "Uber"],
    features: { title: "Почему выбирают нас", items: [
      { icon: "💰", title: "Фикс цена", desc: "Знаете стоимость до поездки" },
      { icon: "🕐", title: "24/7", desc: "Работаем всегда" },
      { icon: "✡️", title: "Шаббат", desc: "Работаем +25%" },
      { icon: "✈️", title: "Аэропорт", desc: "Встреча с табличкой" },
      { icon: "💬", title: "WhatsApp", desc: "Связь с водителем" },
      { icon: "⭐", title: "Отзывы", desc: "Рейтинг 4.9" },
    ]},
    pricing: { title: "Прозрачные тарифы", day: "День", night: "Ночь", shabbat: "Шаббат", airport: "Аэропорт" },
    reviews: { title: "Отзывы клиентов", items: [
      { text: "Лучший сервис такси в Израиле!", name: "Михаил К.", city: "Иерусалим" },
      { text: "Всегда вовремя и по честной цене.", name: "Анна С.", city: "Тель-Авив" },
      { text: "Рекомендую всем!", name: "Давид Л.", city: "Хайфа" },
    ]},
    faq: { title: "Частые вопросы", items: [
      { q: "Как заказать поездку?", a: "Выберите маршрут на сайте или напишите в WhatsApp." },
      { q: "Какие способы оплаты?", a: "Карта, наличные." },
      { q: "Работаете в шаббат?", a: "Да, с надбавкой +25%." },
    ]},
    cta: { title: "Готовы ехать?", btn: "Заказать в WhatsApp" },
    footer: { rights: "Все права защищены" },
    map: { price: "Цена", km: "км" },
  },
  en: {
    dir: "ltr" as const,
    nav: { about: "About", routes: "Routes", pricing: "Pricing", reviews: "Reviews", login: "Login", order: "Book" },
    hero: { badge: "New in Israel", title: "Transfers that work", subtitle: "Fixed price before the trip. No meter. No surprises.", from: "From", to: "To", date: "Date", time: "Time", calculate: "Get price" },
    trust: ["Yandex Go", "Gett", "Bolt", "Uber"],
    features: { title: "Why choose us", items: [
      { icon: "💰", title: "Fixed price", desc: "Know cost upfront" },
      { icon: "🕐", title: "24/7", desc: "Always available" },
      { icon: "✡️", title: "Shabbat", desc: "Service +25%" },
      { icon: "✈️", title: "Airport", desc: "Meet & greet" },
      { icon: "💬", title: "WhatsApp", desc: "Driver contact" },
      { icon: "⭐", title: "Reviews", desc: "4.9 rating" },
    ]},
    pricing: { title: "Transparent pricing", day: "Day", night: "Night", shabbat: "Shabbat", airport: "Airport" },
    reviews: { title: "Customer reviews", items: [
      { text: "Best taxi service in Israel!", name: "Michael K.", city: "Jerusalem" },
      { text: "Always on time and fair price.", name: "Anna S.", city: "Tel Aviv" },
      { text: "Recommend to everyone!", name: "David L.", city: "Haifa" },
    ]},
    faq: { title: "FAQ", items: [
      { q: "How to book?", a: "Select route on site or write to WhatsApp." },
      { q: "Payment methods?", a: "Card, cash." },
      { q: "Work on Shabbat?", a: "Yes, with +25% surcharge." },
    ]},
    cta: { title: "Ready to go?", btn: "Book on WhatsApp" },
    footer: { rights: "All rights reserved" },
    map: { price: "Price", km: "km" },
  },
  he: {
    dir: "rtl" as const,
    nav: { about: "אודות", routes: "מסלולים", pricing: "מחירים", reviews: "ביקורות", login: "התחבר", order: "הזמן" },
    hero: { badge: "חדש בישראל", title: "הסעות שעובדות", subtitle: "מחיר קבוע לפני הנסיעה. בלי מונה. בלי הפתעות.", from: "מאיפה", to: "לאן", date: "תאריך", time: "שעה", calculate: "קבל מחיר" },
    trust: ["Yandex Go", "Gett", "Bolt", "Uber"],
    features: { title: "למה בוחרים בנו", items: [
      { icon: "💰", title: "מחיר קבוע", desc: "דע עלות מראש" },
      { icon: "🕐", title: "24/7", desc: "תמיד זמינים" },
      { icon: "✡️", title: "שבת", desc: "שירות +25%" },
      { icon: "✈️", title: "שדה תעופה", desc: "קבלת פנים" },
      { icon: "💬", title: "WhatsApp", desc: "קשר עם נהג" },
      { icon: "⭐", title: "ביקורות", desc: "דירוג 4.9" },
    ]},
    pricing: { title: "תמחור שקוף", day: "יום", night: "לילה", shabbat: "שבת", airport: "שדה תעופה" },
    reviews: { title: "ביקורות לקוחות", items: [
      { text: "שירות המוניות הטוב בישראל!", name: "מיכאל כ.", city: "ירושלים" },
      { text: "תמיד בזמן ומחיר הוגן.", name: "אנה ס.", city: "תל אביב" },
      { text: "ממליץ לכולם!", name: "דוד ל.", city: "חיפה" },
    ]},
    faq: { title: "שאלות נפוצות", items: [
      { q: "איך מזמינים?", a: "בחר מסלול באתר או כתוב ל-WhatsApp." },
      { q: "אמצעי תשלום?", a: "כרטיס, מזומן." },
      { q: "עובדים בשבת?", a: "כן, עם תוספת +25%." },
    ]},
    cta: { title: "מוכנים לנסוע?", btn: "הזמן ב-WhatsApp" },
    footer: { rights: "כל הזכויות שמורות" },
    map: { price: "מחיר", km: "ק״מ" },
  },
}

const cities = {
  ru: [
    { id: "jerusalem", name: "Иерусалим", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "Тель-Авив", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "Хайфа", coords: [32.7940, 34.9896] as [number, number] },
    { id: "bengurion", name: "Б��н-Гурион", coords: [32.0055, 34.8854] as [number, number] },
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

export default function SaaSConcept() {
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
    <div className="min-h-screen bg-[#FAFAFA]" dir={t.dir} style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* WhatsApp Float */}
      <a href="https://wa.me/972501234567" target="_blank" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
      </a>

      {/* Nav */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        variant="saas" 
        translations={t}
        loginPath="/concepts/apple/login"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">{t.hero.badge}</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">{t.hero.title}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">{t.hero.subtitle}</p>
          
          {/* Booking Form */}
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 border">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 uppercase block mb-1">{t.hero.from}</label>
                  <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                    {cityList.filter(c => c.id !== toCity).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase block mb-1">{t.hero.to}</label>
                  <select value={toCity} onChange={(e) => setToCity(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                    {cityList.filter(c => c.id !== fromCity).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="p-3 bg-gray-50 rounded-xl border border-gray-200" />
                <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="p-3 bg-gray-50 rounded-xl border border-gray-200" />
              </div>
              <button onClick={scrollToMap} className="w-full py-4 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-600 transition-all hover:scale-[1.02]">
                {t.hero.calculate} →
              </button>
            </div>
          </div>

          {/* Trust */}
          <div className="mt-12 flex items-center justify-center gap-8 opacity-40">
            {t.trust.map((name, i) => <span key={i} className="text-sm font-medium">{name}</span>)}
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={mapRef} className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <MapComponent from={fromCityData.coords} to={toCityData.coords} fromName={fromCityData.name} toName={toCityData.name} />
          </div>
          {showResult && (
            <AnimatedSection>
              <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{fromCityData.name} → {toCityData.name}</p>
                  <p className="text-sm text-gray-500">{distance} {t.map.km}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-violet-500">₪{price}</p>
                  <a href={`https://wa.me/972501234567?text=${encodeURIComponent(`${fromCityData.name} → ${toCityData.name}`)}`} target="_blank" className="inline-block mt-2 px-6 py-2 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#20BD5A]">
                    WhatsApp
                  </a>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-black text-center mb-12">{t.features.title}</h2></AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {t.features.items.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-gray-50 hover:bg-violet-50 transition-colors">
                  <span className="text-3xl mb-4 block">{f.icon}</span>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-black text-center mb-12">{t.pricing.title}</h2></AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: t.pricing.day, value: "100%", color: "bg-gray-100" },
              { label: t.pricing.night, value: "+25%", color: "bg-violet-500 text-white" },
              { label: t.pricing.shabbat, value: "+25%", color: "bg-amber-100" },
              { label: t.pricing.airport, value: "FIX", color: "bg-blue-100" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`p-6 rounded-2xl ${item.color} text-center`}>
                  <p className="text-sm opacity-70 mb-2">{item.label}</p>
                  <p className="text-2xl font-black">{item.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-black text-center mb-12">{t.reviews.title}</h2></AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {t.reviews.items.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-gray-50">
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}</div>
                  <p className="text-gray-600 mb-4">&ldquo;{r.text}&rdquo;</p>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.city}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection><h2 className="text-3xl font-black text-center mb-12">{t.faq.title}</h2></AnimatedSection>
          <div className="space-y-3">
            {t.faq.items.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-4 flex justify-between items-center font-medium">
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

      {/* CTA */}
      <section className="py-20 px-6">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-black mb-6">{t.cta.title}</h2>
            <a href="https://wa.me/972501234567" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-600 font-semibold rounded-full hover:scale-105 transition-transform">
              {t.cta.btn}
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded"></div>
            <span className="font-semibold text-gray-900">RideFlow</span>
          </div>
          <p>© 2026. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}
