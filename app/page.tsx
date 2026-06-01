import Link from "next/link"

const concepts = [
  {
    id: 1,
    name: "Минимализм",
    path: "/concepts/apple",
    description: "Чистый белый фон, огромная типографика, pill-кнопки, frosted glass навигация",
    color: "bg-[#0071E3]",
    ready: true,
  },
  {
    id: 2,
    name: "Black стиль",
    path: "/concepts/uber",
    description: "Слева форма, справа карточки с иконками. Тёмные кнопки",
    color: "bg-black",
    ready: true,
  },
  {
    id: 3,
    name: "Jitter стиль",
    path: "/concepts/saas",
    description: "Огромный заголовок по центру, badge сверху, один CTA",
    color: "bg-violet-600",
    ready: true,
  },
  {
    id: 4,
    name: "Fintech стиль",
    path: "/concepts/stripe",
    description: "Split-layout с плавающими элементами. Градиенты",
    color: "bg-gradient-to-r from-blue-600 to-cyan-500",
    ready: true,
  },
  {
    id: 5,
    name: "Alpaca стиль",
    path: "/concepts/bold",
    description: "Яркий акцентный фон, mockup телефона справа",
    color: "bg-amber-400",
    ready: true,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBFBFD] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Концепции дизайна RideFlow
        </h1>
        <p className="text-gray-500 text-center mb-12">
          Нажмите на концепцию, чтобы открыть полную страницу
        </p>

        <div className="space-y-4">
          {concepts.map((concept) => (
            <Link
              key={concept.id}
              href={concept.ready ? concept.path : "#"}
              // target={concept.ready ? "_blank" : undefined}
              className={`flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#0071E3]/20 transition-all group ${!concept.ready ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className={`w-12 h-12 rounded-xl ${concept.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                {concept.id}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#0071E3] transition-colors flex items-center gap-2">
                  {concept.name}
                  {concept.ready && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Готово</span>}
                  {!concept.ready && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Скоро</span>}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  {concept.description}
                </p>
              </div>
              <svg 
                className="w-5 h-5 text-gray-400 group-hover:text-[#0071E3] group-hover:translate-x-1 transition-all shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-12">
          Каждая ссылка открывается в новой вкладке
        </p>
      </div>
    </main>
  )
}
