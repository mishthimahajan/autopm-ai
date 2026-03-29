export default function Sidebar({ dark, setDark, setPage }) {
  return (
    <div className="w-64 h-screen bg-black/80 backdrop-blur-lg text-white p-5 flex flex-col justify-between">

      <div>
        <h1 className="text-2xl font-bold mb-6">🤖 AutoPM</h1>

        <ul className="space-y-4">
          <li onClick={() => setPage("dashboard")} className="hover:text-purple-400 cursor-pointer">
            🏠 Dashboard
          </li>

          <li onClick={() => setPage("tasks")} className="hover:text-purple-400 cursor-pointer">
            📋 Tasks
          </li>

          <li onClick={() => setPage("analytics")} className="hover:text-purple-400 cursor-pointer">
            📊 Analytics
          </li>
        </ul>
      </div>

      <button
        onClick={() => setDark(!dark)}
        className="bg-linear-to-r from-purple-500 to-pink-500 p-2 rounded-xl"
      >
        {dark ? "🌙 Dark Mode" : "☀ Light Mode"}
      </button>
    </div>
  );
}