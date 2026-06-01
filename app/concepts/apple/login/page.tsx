"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simple validation - any email/password works
    if (email && password.length >= 4) {
      localStorage.setItem("rideflow_admin", JSON.stringify({ email, loggedIn: true }))
      router.push("/concepts/apple/admin")
    } else {
      setError("Введите email и пароль (минимум 4 символа)")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center px-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/concepts/apple" className="inline-flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#0071E3]"></span>
            <span className="text-2xl font-bold text-[#1D1D1F]">RideFlow</span>
          </a>
          <h1 className="text-2xl font-bold text-[#1D1D1F] mt-6">Вход в админ-панель</h1>
          <p className="text-[#6E6E73] mt-2">Введите любой email и пароль</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white rounded-3xl shadow-xl p-8 border border-black/[0.08]">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rideflow.com"
                className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#0071E3] text-white font-medium rounded-xl hover:bg-[#0077ED] disabled:opacity-50 transition-colors"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </div>
        </form>

        {/* Back link */}
        <p className="text-center mt-6">
          <a href="/concepts/apple" className="text-[#0071E3] hover:underline text-sm">
            ← Вернуться на сайт
          </a>
        </p>
      </div>
    </div>
  )
}
