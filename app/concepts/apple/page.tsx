"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/app/components/navbar"

const MapComponent = dynamic(() => import("./map"), { ssr: false })

type Lang = "ru" | "en" | "he"

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useInView()
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const translations = {
  ru: {
    dir: "ltr" as const,
    nav: { about: "О нас", routes: "Маршруты", pricing: "Тарифы", reviews: "Отзывы", login: "Войти", order: "Заказать" },
    hero: {
      badge: "Трансфер по Израилю · 24/7",
      title1: "Вы садитесь.",
      title2: "Мы везём.",
      title3: "Точно и в срок.",
      subtitle: "Фиксированная цена до поездки. Шаббат, ночь, праздники — без сюрпризов.",
      calc: "Рассчитайте маршрут",
      from: "Откуда",
      to: "Куда",
      date: "Дата",
      time: "Время",
      shabbat: "Шаббат / חג — надбавка +25% применяется автоматически",
      today: "Сегодня, сейчас",
      calculate: "Рассчитать",
    },
    pills: ["Фиксированная цена", "Оплата картой", "Работаем в Шаббат", "Аэропорт", "Отзывы", "Ночной тариф"],
    pricing: {
      title: "Как мы считаем цену",
      day: "Дневной тариф", dayDesc: "Базовый", dayNote: "посадка + км",
      night: "Ночной тариф", nightDesc: "+25%", nightNote: "21:00–05:30",
      shabbat: "Шаббат / חג", shabbatDesc: "+25%", shabbatNote: "Пт→Сб",
      airport: "Аэропорт", airportDesc: "Фикс", airportNote: "сбор включён",
    },
    features: {
      title: "Почему RideFlow",
      items: [
        { icon: "📍", title: "Маршрут на карте", desc: "Видите путь до посадки" },
        { icon: "💰", title: "Честная цена", desc: "Никаких скрытых комиссий" },
        { icon: "💳", title: "Оплата картой", desc: "Visa, MasterCard, наличные" },
        { icon: "✡️", title: "Шаббат и праздники", desc: "Работаем всегда" },
        { icon: "⭐", title: "Реальные отзывы", desc: "Рейтинг от клиентов" },
        { icon: "💬", title: "WhatsApp", desc: "Прямая связь с водителем" },
      ],
    },
    reviews: {
      title: "Что говорят клиенты",
      items: [
        { text: "Заказывал трансфер из Бен-Гуриона. Водитель ждал с табличкой, помог с багажом!", name: "Михаил К.", city: "Иерусалим" },
        { text: "Пользуюсь регулярно. Всегда вовремя, машины чистые. Рекомендую!", name: "Анна С.", city: "Тель-Авив" },
        { text: "WhatsApp очень удобен — написал, через минуту ответили.", name: "Давид Л.", city: "Хайфа" },
      ],
    },
    faq: {
      title: "Частые вопросы",
      items: [
        { q: "Как заказать поездку?", a: "Выберите маршрут на сайте или напишите в WhatsApp. Мы свяжемся для подтверждения." },
        { q: "Можно оплатить картой?", a: "Да! Принимаем все карты, Apple Pay, Google Pay и наличные." },
        { q: "Работаете в шаббат?", a: "Да, работаем 24/7. В шаббат и праздники действует надбавка +25%." },
        { q: "Сколько стоит поездка в аэропорт?", a: "Цена фиксированная и зависит от города. Например, Тель-Авив → Бен-Гурион от ₪120." },
        { q: "Можно заказать на определённое время?", a: "Конечно! Укажите дату и время при заказе." },
      ],
    },
    whatsapp: { title: "Остались вопросы?", subtitle: "Напишите нам в WhatsApp", btn: "Открыть WhatsApp" },
    footer: { rights: "Все права защищены", contact: "Связаться" },
    map: { price: "Цена", duration: "мин", distance: "км" },
  },
  en: {
    dir: "ltr" as const,
    nav: { about: "About", routes: "Routes", pricing: "Pricing", reviews: "Reviews", login: "Login", order: "Book" },
    hero: {
      badge: "Israel Transfers · 24/7",
      title1: "You sit.",
      title2: "We drive.",
      title3: "On time.",
      subtitle: "Fixed price before the trip. Shabbat, night, holidays — no surprises.",
      calc: "Calculate route",
      from: "From",
      to: "To",
      date: "Date",
      time: "Time",
      shabbat: "Shabbat / Holiday — +25% surcharge applies automatically",
      today: "Today, now",
      calculate: "Calculate",
    },
    pills: ["Fixed price", "Card payment", "Shabbat service", "Airport", "Reviews", "Night rate"],
    pricing: {
      title: "How we calculate price",
      day: "Day rate", dayDesc: "Base", dayNote: "pickup + km",
      night: "Night rate", nightDesc: "+25%", nightNote: "21:00–05:30",
      shabbat: "Shabbat / חג", shabbatDesc: "+25%", shabbatNote: "Fri→Sat",
      airport: "Airport", airportDesc: "Fixed", airportNote: "fee included",
    },
    features: {
      title: "Why RideFlow",
      items: [
        { icon: "📍", title: "Route on map", desc: "See path before pickup" },
        { icon: "💰", title: "Fair price", desc: "No hidden fees" },
        { icon: "💳", title: "Card payment", desc: "Visa, MasterCard, cash" },
        { icon: "✡️", title: "Shabbat & holidays", desc: "Always available" },
        { icon: "⭐", title: "Real reviews", desc: "Customer ratings" },
        { icon: "💬", title: "WhatsApp", desc: "Direct driver contact" },
      ],
    },
    reviews: {
      title: "What customers say",
      items: [
        { text: "Ordered transfer from Ben Gurion. Driver waited with sign, helped with luggage!", name: "Michael K.", city: "Jerusalem" },
        { text: "Use regularly. Always on time, clean cars. Recommend!", name: "Anna S.", city: "Tel Aviv" },
        { text: "WhatsApp is very convenient — wrote, got reply in a minute.", name: "David L.", city: "Haifa" },
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "How to book a ride?", a: "Select route on website or write to WhatsApp. We'll confirm." },
        { q: "Can I pay by card?", a: "Yes! We accept all cards, Apple Pay, Google Pay and cash." },
        { q: "Do you work on Shabbat?", a: "Yes, 24/7. Shabbat and holidays have +25% surcharge." },
        { q: "How much is airport transfer?", a: "Fixed price depends on city. E.g. Tel Aviv → Ben Gurion from ₪120." },
        { q: "Can I book for specific time?", a: "Of course! Specify date and time when booking." },
      ],
    },
    whatsapp: { title: "Questions?", subtitle: "Write us on WhatsApp", btn: "Open WhatsApp" },
    footer: { rights: "All rights reserved", contact: "Contact" },
    map: { price: "Price", duration: "min", distance: "km" },
  },
  he: {
    dir: "rtl" as const,
    nav: { about: "אודות", routes: "מסלולים", pricing: "מחירים", reviews: "ביקורות", login: "התחבר", order: "הזמן" },
    hero: {
      badge: "הסעות בישראל · 24/7",
      title1: "אתה יושב.",
      title2: "אנחנו נוסעים.",
      title3: "בזמן.",
      subtitle: "מחיר קבוע לפני הנסיעה. שבת, לילה, חגים — בלי הפתעות.",
      calc: "חשב מסלול",
      from: "מאיפה",
      to: "לאן",
      date: "תאריך",
      time: "שעה",
      shabbat: "שבת / חג — תוספת של 25% חלה אוטומטית",
      today: "היום, עכשיו",
      calculate: "חשב",
    },
    pills: ["מחיר קבוע", "תשלום בכרטיס", "שירות בשבת", "שדה תעופה", "ביקורות", "תעריף לילה"],
    pricing: {
      title: "איך אנחנו מחשבים מחיר",
      day: "תעריף יום", dayDesc: "בסיס", dayNote: "איסוף + ק״מ",
      night: "תעריף לילה", nightDesc: "+25%", nightNote: "21:00–05:30",
      shabbat: "שבת / חג", shabbatDesc: "+25%", shabbatNote: "שישי→שבת",
      airport: "שדה תעופה", airportDesc: "קבוע", airportNote: "כולל אגרה",
    },
    features: {
      title: "למה RideFlow",
      items: [
        { icon: "📍", title: "מסלול במפה", desc: "ראה נתיב לפני איסוף" },
        { icon: "💰", title: "מחיר הוגן", desc: "ללא עמלות נסתרות" },
        { icon: "💳", title: "תשלום בכרטיס", desc: "Visa, MasterCard, מזומן" },
        { icon: "✡️", title: "שבת וחגים", desc: "תמיד זמינים" },
        { icon: "⭐", title: "ביקורות אמיתיות", desc: "דירוג לקוחות" },
        { icon: "💬", title: "WhatsApp", desc: "קשר ישיר עם הנהג" },
      ],
    },
    reviews: {
      title: "מה לקוחות אומרים",
      items: [
        { text: "הזמנתי הסעה מנתב״ג. הנהג חיכה עם שלט, עזר עם המזוודות!", name: "מיכאל כ.", city: "ירושלים" },
        { text: "משתמש באופן קבוע. תמיד בזמן, מכוניות נקיות. ממליץ!", name: "אנה ס.", city: "תל אביב" },
        { text: "WhatsApp מאוד נוח — כתבתי, קיבלתי תשובה תוך דקה.", name: "דוד ל.", city: "חיפה" },
      ],
    },
    faq: {
      title: "שאלות נפוצות",
      items: [
        { q: "איך מזמינים נסיעה?", a: "בחר מסלול באתר או כתוב ל-WhatsApp. נאשר בהקדם." },
        { q: "אפשר לשלם בכרטיס?", a: "כן! מקבלים כל הכרטיסים, Apple Pay, Google Pay ומזומן." },
        { q: "עובדים בשבת?", a: "כן, 24/7. בשבת וחגים יש תוספת של 25%." },
        { q: "כמה עולה הסעה לשדה תעופה?", a: "מחיר קבוע לפי עיר. למשל ת״א → נתב״ג מ-₪120." },
        { q: "אפשר להזמין לשעה מסוימת?", a: "בטח! ציין תאריך ושעה בהזמנה." },
      ],
    },
    whatsapp: { title: "שאלות?", subtitle: "כתוב לנו ב-WhatsApp", btn: "פתח WhatsApp" },
    footer: { rights: "כל הזכויות שמורות", contact: "צור קשר" },
    map: { price: "מחיר", duration: "דק׳", distance: "ק״מ" },
  },
}

const cities = {
  ru: [
    { id: "jerusalem", name: "Иерусалим", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "Тель-Авив", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "Хайфа", coords: [32.7940, 34.9896] as [number, number] },
    { id: "eilat", name: "Эйлат", coords: [29.5577, 34.9519] as [number, number] },
    { id: "bengurion", name: "Аэропорт Бен-Гурион", coords: [32.0055, 34.8854] as [number, number] },
    { id: "beersheva", name: "Беэр-Шева", coords: [31.2530, 34.7915] as [number, number] },
    { id: "netanya", name: "Нетания", coords: [32.3215, 34.8532] as [number, number] },
  ],
  en: [
    { id: "jerusalem", name: "Jerusalem", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "Tel Aviv", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "Haifa", coords: [32.7940, 34.9896] as [number, number] },
    { id: "eilat", name: "Eilat", coords: [29.5577, 34.9519] as [number, number] },
    { id: "bengurion", name: "Ben Gurion Airport", coords: [32.0055, 34.8854] as [number, number] },
    { id: "beersheva", name: "Be'er Sheva", coords: [31.2530, 34.7915] as [number, number] },
    { id: "netanya", name: "Netanya", coords: [32.3215, 34.8532] as [number, number] },
  ],
  he: [
    { id: "jerusalem", name: "ירושלים", coords: [31.7683, 35.2137] as [number, number] },
    { id: "telaviv", name: "תל אביב", coords: [32.0853, 34.7818] as [number, number] },
    { id: "haifa", name: "חיפה", coords: [32.7940, 34.9896] as [number, number] },
    { id: "eilat", name: "אילת", coords: [29.5577, 34.9519] as [number, number] },
    { id: "bengurion", name: "נתב״ג", coords: [32.0055, 34.8854] as [number, number] },
    { id: "beersheva", name: "באר שבע", coords: [31.2530, 34.7915] as [number, number] },
    { id: "netanya", name: "נתניה", coords: [32.3215, 34.8532] as [number, number] },
  ],
}

const priceMatrix: Record<string, Record<string, number>> = {
  jerusalem: { telaviv: 245, haifa: 450, eilat: 850, bengurion: 180, beersheva: 320, netanya: 350 },
  telaviv: { jerusalem: 245, haifa: 320, eilat: 950, bengurion: 120, beersheva: 380, netanya: 85 },
  haifa: { jerusalem: 450, telaviv: 320, eilat: 1100, bengurion: 380, beersheva: 480, netanya: 180 },
  eilat: { jerusalem: 850, telaviv: 950, haifa: 1100, bengurion: 900, beersheva: 550, netanya: 1000 },
  bengurion: { jerusalem: 180, telaviv: 120, haifa: 380, eilat: 900, beersheva: 280, netanya: 150 },
  beersheva: { jerusalem: 320, telaviv: 380, haifa: 480, eilat: 550, bengurion: 280, netanya: 420 },
  netanya: { jerusalem: 350, telaviv: 85, haifa: 180, eilat: 1000, bengurion: 150, beersheva: 420 },
}

export default function AppleConcept() {
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
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  const t = translations[lang]
  const cityList = cities[lang]

  const fromCityData = cityList.find(c => c.id === fromCity)!
  const toCityData = cityList.find(c => c.id === toCity)!

  const price = priceMatrix[fromCity]?.[toCity] || 0
  const distance = Math.round(
    Math.sqrt(
      Math.pow((fromCityData.coords[0] - toCityData.coords[0]) * 111, 2) +
      Math.pow((fromCityData.coords[1] - toCityData.coords[1]) * 85, 2)
    )
  )
  const duration = Math.round(distance * 1.2)

  const swapCities = () => {
    setFromCity(toCity)
    setToCity(fromCity)
  }

  useEffect(() => {
    setShowResult(false)
  }, [fromCity, toCity])

  return (
    <div className="min-h-screen bg-[#FBFBFD]" dir={t.dir} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* WhatsApp Float */}
      <a href="https://wa.me/972501234567" target="_blank" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </a>

      {/* Navigation */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        variant="apple" 
        translations={t}
        loginPath="/concepts/apple/login"
      />

      {/* Hero */}
      <section id="hero" className="pt-28 pb-20 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0071E3]/10 text-sm text-[#0071E3] mb-8">
            {t.hero.badge}
          </div>

          <h1 className="text-[clamp(48px,9vw,80px)] font-[800] text-[#1D1D1F] tracking-[-2px] leading-[1.05] mb-6">
            {t.hero.title1}<br />
            {t.hero.title2}<br />
            <span className="bg-gradient-to-r from-[#0071E3] to-[#00C7FF] bg-clip-text text-transparent">{t.hero.title3}</span>
          </h1>

          <p className="text-lg text-[#6E6E73] max-w-2xl mx-auto mb-12">{t.hero.subtitle}</p>

          {/* Booking Card */}
          <div className="max-w-[660px] mx-auto bg-white rounded-3xl shadow-xl p-8 border border-black/[0.08]">
            <p className="text-xs font-medium text-[#6E6E73] uppercase tracking-wider mb-6">{t.hero.calc}</p>
            
            <div className="space-y-3 relative">
              <div className="relative">
                <div className={`absolute ${t.dir === "rtl" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#34C759]`}></div>
                <select 
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className={`w-full ${t.dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"} py-4 bg-[#F5F5F7] rounded-xl text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 appearance-none cursor-pointer`}
                >
                  {cityList.filter(c => c.id !== toCity).map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>

              <button onClick={swapCities} className={`absolute ${t.dir === "rtl" ? "left-4" : "right-4"} top-[72px] -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#F5F5F7] z-10`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
              </button>

              <div className="relative">
                <div className={`absolute ${t.dir === "rtl" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FF3B30]`}></div>
                <select 
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className={`w-full ${t.dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"} py-4 bg-[#F5F5F7] rounded-xl text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 appearance-none cursor-pointer`}
                >
                  {cityList.filter(c => c.id !== fromCity).map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[rgba(184,134,11,0.08)] rounded-xl text-start">
                <span className="text-lg">✡️</span>
                <p className="text-sm text-[#B8860B]">{t.hero.shabbat}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className={`absolute ${t.dir === "rtl" ? "right-4" : "left-4"} top-2 text-xs text-[#6E6E73]`}>{t.hero.date}</label>
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={`w-full ${t.dir === "rtl" ? "pr-4 pl-4" : "pl-4 pr-4"} pt-7 pb-3 bg-[#F5F5F7] rounded-xl text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20`}
                  />
                </div>
                <div className="relative">
                  <label className={`absolute ${t.dir === "rtl" ? "right-4" : "left-4"} top-2 text-xs text-[#6E6E73]`}>{t.hero.time}</label>
                  <input 
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className={`w-full ${t.dir === "rtl" ? "pr-4 pl-4" : "pl-4 pr-4"} pt-7 pb-3 bg-[#F5F5F7] rounded-xl text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20`}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={scrollToMap} className="flex-1 py-4 bg-[#0071E3] text-white font-medium rounded-xl hover:bg-[#0077ED] transition-all hover:scale-[1.02] active:scale-[0.98]">
                  {t.hero.calculate} →
                </button>
              </div>
            </div>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {t.pills.map((pill, i) => (
              <span key={i} className="px-4 py-2 bg-white rounded-full text-sm text-[#1D1D1F]/70 border border-black/[0.08]">{pill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div ref={mapRef} className="relative w-full h-[400px] rounded-[28px] overflow-hidden border border-black/[0.08]">
            <MapComponent from={fromCityData.coords} to={toCityData.coords} fromName={fromCityData.name} toName={toCityData.name} />
            {showResult && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-2xl shadow-xl text-center z-[1000]">
                <p className="text-3xl font-bold text-[#0071E3]">₪{price}</p>
                <p className="text-sm text-[#6E6E73]">~{duration} {t.map.duration} · {distance} {t.map.distance}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-medium text-[#6E6E73] uppercase tracking-wider text-center mb-8">{t.pricing.title}</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatedSection delay={0}>
              <div className="bg-white rounded-[20px] p-6 border border-black/[0.08] h-full">
                <span className="text-3xl mb-4 block">☀️</span>
                <p className="text-xs text-[#6E6E73] uppercase mb-2">{t.pricing.day}</p>
                <p className="text-2xl font-[800] text-[#1D1D1F]">{t.pricing.dayDesc}</p>
                <p className="text-sm text-[#6E6E73]">{t.pricing.dayNote}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-[#0071E3] rounded-[20px] p-6 h-full">
                <span className="text-3xl mb-4 block">🌙</span>
                <p className="text-xs text-white/70 uppercase mb-2">{t.pricing.night}</p>
                <p className="text-2xl font-[800] text-white">{t.pricing.nightDesc}</p>
                <p className="text-sm text-white/70">{t.pricing.nightNote}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-[rgba(184,134,11,0.1)] rounded-[20px] p-6 h-full">
                <span className="text-3xl mb-4 block">✡️</span>
                <p className="text-xs text-[#B8860B]/70 uppercase mb-2">{t.pricing.shabbat}</p>
                <p className="text-2xl font-[800] text-[#B8860B]">{t.pricing.shabbatDesc}</p>
                <p className="text-sm text-[#B8860B]/70">{t.pricing.shabbatNote}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-[20px] p-6 border border-black/[0.08] h-full">
                <span className="text-3xl mb-4 block">✈️</span>
                <p className="text-xs text-[#6E6E73] uppercase mb-2">{t.pricing.airport}</p>
                <p className="text-2xl font-[800] text-[#1D1D1F]">{t.pricing.airportDesc}</p>
                <p className="text-sm text-[#6E6E73]">{t.pricing.airportNote}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-[#F5F5F7]">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-medium text-[#6E6E73] uppercase tracking-wider text-center mb-8">{t.features.title}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.features.items.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-black/[0.08] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full">
                  <span className="text-3xl mb-4 block">{f.icon}</span>
                  <h3 className="font-semibold text-[#1D1D1F] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#6E6E73]">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-medium text-[#6E6E73] uppercase tracking-wider text-center mb-8">{t.reviews.title}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.reviews.items.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-6 border border-black/[0.08] hover:shadow-lg transition-shadow h-full">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <span key={j} className="text-[#FF9F0A]">★</span>)}</div>
                  <p className="text-[#6E6E73] italic mb-4">&ldquo;{r.text}&rdquo;</p>
                  <p className="font-semibold text-[#1D1D1F]">{r.name}</p>
                  <p className="text-sm text-[#6E6E73]">{r.city}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-[#F5F5F7]">
        <div className="max-w-[800px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-medium text-[#6E6E73] uppercase tracking-wider text-center mb-8">{t.faq.title}</p>
          </AnimatedSection>
          <div className="space-y-3">
            {t.faq.items.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-black/[0.08] overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-start hover:bg-[#F5F5F7]/50 transition-colors">
                    <span className="font-medium text-[#1D1D1F]">{faq.q}</span>
                    <span className={`text-[#6E6E73] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  <div 
                    className="overflow-hidden transition-all duration-300"
                    style={{ 
                      maxHeight: openFaq === i ? "200px" : "0",
                      opacity: openFaq === i ? 1 : 0
                    }}
                  >
                    <div className="px-6 pb-4 text-[#6E6E73]">{faq.a}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-[28px] p-12 text-center">
              <h2 className="text-3xl font-[800] text-[#1D1D1F] mb-4">{t.whatsapp.title}</h2>
              <p className="text-[#6E6E73] mb-6">{t.whatsapp.subtitle}</p>
              <a href="https://wa.me/972501234567" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-medium rounded-full hover:bg-[#20BD5A] hover:scale-105 transition-all">
                💬 {t.whatsapp.btn}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-black/5">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#6E6E73]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0071E3]"></span>
            <span className="font-semibold text-[#1D1D1F]">RideFlow</span>
            <span>© 2026. {t.footer.rights}</span>
          </div>
          <div className="flex gap-6">
            <a href="https://wa.me/972501234567" className="hover:text-[#0071E3]">{t.footer.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
