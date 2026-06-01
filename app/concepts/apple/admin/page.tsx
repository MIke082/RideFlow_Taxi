"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const mockOrders = [
  { id: 1, from: "Иерусалим", to: "Тель-Авив", date: "2024-12-15", time: "14:30", price: 245, status: "pending", phone: "+972-50-123-4567" },
  { id: 2, from: "Хайфа", to: "Бен-Гурион", date: "2024-12-15", time: "06:00", price: 380, status: "confirmed", phone: "+972-50-987-6543" },
  { id: 3, from: "Эйлат", to: "Тель-Авив", date: "2024-12-16", time: "08:00", price: 950, status: "completed", phone: "+972-50-456-7890" },
  { id: 4, from: "Нетания", to: "Иерусалим", date: "2024-12-16", time: "19:00", price: 350, status: "pending", phone: "+972-50-321-6547" },
  { id: 5, from: "Беэр-Шева", to: "Бен-Гурион", date: "2024-12-17", time: "05:30", price: 280, status: "confirmed", phone: "+972-50-111-2222" },
]

const cities = [
  { id: "jerusalem", name: "Иерусалим" },
  { id: "telaviv", name: "Тель-Авив" },
  { id: "haifa", name: "Хайфа" },
  { id: "eilat", name: "Эйлат" },
  { id: "bengurion", name: "Аэропорт Бен-Гурион" },
  { id: "beersheva", name: "Беэр-Шева" },
  { id: "netanya", name: "Нетания" },
]

const priceMatrix: Record<string, Record<string, number>> = {
  jerusalem: { telaviv: 245, haifa: 450, eilat: 850, bengurion: 180, beersheva: 320, netanya: 350 },
  telaviv: { jerusalem: 245, haifa: 320, eilat: 950, bengurion: 120, beersheva: 380, netanya: 85 },
  haifa: { jerusalem: 450, telaviv: 320, eilat: 1100, bengurion: 380, beersheva: 480, netanya: 180 },
  eilat: { jerusalem: 850, telaviv: 950, haifa: 1100, bengurion: 900, beersheva: 550, netanya: 1000 },
  bengurion: { jerusalem: 180, telaviv: 120, haifa: 380, eilat: 900, beersheva: 280, netanya: 150 },
  beersheva: { jerusalem: 320, telaviv: 380, haifa: 480, eilat: 550, bengurion: 280, netanya: 420 },
  netanya: { jerusalem: 350, telaviv: 85, haifa: 180, eilat: 1000, bengurion: 150, beersheva: 420 },
}

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"orders" | "prices">("orders")
  const [orders, setOrders] = useState(mockOrders)
  const [prices, setPrices] = useState(priceMatrix)
  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("rideflow_admin")
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      router.push("/concepts/apple/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("rideflow_admin")
    router.push("/concepts/apple")
  }

  const updateOrderStatus = (id: number, status: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
  }

  const updatePrice = (from: string, to: string, newPrice: number) => {
    setPrices(prev => ({
      ...prev,
      [from]: { ...prev[from], [to]: newPrice }
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center">
        <div className="text-[#6E6E73]">Загрузка...</div>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const statusLabels: Record<string, string> = {
    pending: "Ожидает",
    confirmed: "Подтвержден",
    completed: "Завершен",
    cancelled: "Отменен",
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <a href="/concepts/apple" className="flex items-center gap-2">
              <span className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-[#0071E3]"></span>
              <span className="text-lg md:text-xl font-bold text-[#1D1D1F]">RideFlow</span>
            </a>
            <span className="text-[#6E6E73] hidden sm:inline">/</span>
            <span className="text-[#1D1D1F] font-medium hidden sm:inline">Админ</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-xs md:text-sm text-[#6E6E73] truncate max-w-[100px] md:max-w-none">{user.email}</span>
            <button onClick={handleLogout} className="text-xs md:text-sm text-[#FF3B30] hover:underline whitespace-nowrap">
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-black/5 sticky top-14 md:top-16 z-40">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 md:flex-none px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "orders" ? "border-[#0071E3] text-[#0071E3]" : "border-transparent text-[#6E6E73] hover:text-[#1D1D1F]"}`}
            >
              Заказы ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("prices")}
              className={`flex-1 md:flex-none px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "prices" ? "border-[#0071E3] text-[#0071E3]" : "border-transparent text-[#6E6E73] hover:text-[#1D1D1F]"}`}
            >
              Тарифы
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 md:py-8">
        {activeTab === "orders" && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-[#1D1D1F]">Заказы</h2>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 md:px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Ожидают: {orders.filter(o => o.status === "pending").length}
                </span>
                <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Подтверждены: {orders.filter(o => o.status === "confirmed").length}
                </span>
              </div>
            </div>

            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-black/[0.08]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                      <span className="text-xs md:text-sm text-[#6E6E73]">#{order.id}</span>
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-[#0071E3]">₪{order.price}</p>
                  </div>
                  
                  <div>
                    <p className="text-base md:text-lg font-semibold text-[#1D1D1F]">
                      {order.from} → {order.to}
                    </p>
                    <p className="text-xs md:text-sm text-[#6E6E73] mt-1">
                      {order.date} в {order.time}
                    </p>
                    <a href={`tel:${order.phone}`} className="text-xs md:text-sm text-[#0071E3] mt-1 block">
                      {order.phone}
                    </a>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="w-full md:w-auto px-3 py-2.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20"
                  >
                    <option value="pending">Ожидает</option>
                    <option value="confirmed">Подтвержден</option>
                    <option value="completed">Завершен</option>
                    <option value="cancelled">Отменен</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "prices" && (
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#1D1D1F] mb-4 md:mb-6">Тарифы (₪)</h2>
            
            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
              {cities.filter(c => c.id !== "bengurion").map(fromCity => (
                <div key={fromCity.id} className="bg-white rounded-xl p-4 border border-black/[0.08]">
                  <h3 className="font-semibold text-[#1D1D1F] mb-3">Из: {fromCity.name}</h3>
                  <div className="space-y-2">
                    {cities.filter(c => c.id !== "bengurion" && c.id !== fromCity.id).map(toCity => (
                      <div key={toCity.id} className="flex items-center justify-between">
                        <span className="text-sm text-[#6E6E73]">{toCity.name}</span>
                        <input
                          type="number"
                          value={prices[fromCity.id]?.[toCity.id] || 0}
                          onChange={(e) => updatePrice(fromCity.id, toCity.id, parseInt(e.target.value) || 0)}
                          className="w-24 px-3 py-2 text-center bg-[#F5F5F7] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block bg-white rounded-2xl border border-black/[0.08] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F5F5F7]">
                      <th className="px-4 py-3 text-left text-sm font-medium text-[#6E6E73]">Откуда / Куда</th>
                      {cities.filter(c => c.id !== "bengurion").map(city => (
                        <th key={city.id} className="px-4 py-3 text-center text-sm font-medium text-[#6E6E73] whitespace-nowrap">
                          {city.name.length > 10 ? city.name.substring(0, 10) + "..." : city.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cities.filter(c => c.id !== "bengurion").map(fromCity => (
                      <tr key={fromCity.id} className="border-t border-black/5">
                        <td className="px-4 py-3 text-sm font-medium text-[#1D1D1F]">{fromCity.name}</td>
                        {cities.filter(c => c.id !== "bengurion").map(toCity => (
                          <td key={toCity.id} className="px-4 py-3 text-center">
                            {fromCity.id === toCity.id ? (
                              <span className="text-[#6E6E73]">—</span>
                            ) : (
                              <input
                                type="number"
                                value={prices[fromCity.id]?.[toCity.id] || 0}
                                onChange={(e) => updatePrice(fromCity.id, toCity.id, parseInt(e.target.value) || 0)}
                                className="w-20 px-2 py-1 text-center bg-[#F5F5F7] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0071E3]/20"
                              />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs md:text-sm text-[#6E6E73] mt-4">
              * Измените цены. В реальном приложении сохранятся в БД.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
