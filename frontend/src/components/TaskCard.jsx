import { motion } from "framer-motion";

export default function TaskCard({ task, markComplete, deleteTask }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-2xl shadow-xl hover:scale-105 transition duration-300">

      <h3 className="font-bold text-lg mb-2 text-white">{task.title}</h3>

      <p className="text-gray-200">👤 {task.assignee}</p>
      <p className="text-gray-200">📅 {task.deadline}</p>

      <div className="flex gap-2 mt-3">

        {task.status !== "completed" && (
          <button
            onClick={markComplete}
            className="flex-1 bg-green-600 py-2 rounded-xl"
          >
            ✔ Complete
          </button>
        )}

        <button
          onClick={deleteTask}
          className="flex-1 bg-red-500 py-2 rounded-xl"
        >
          🗑 Delete
        </button>

      </div>
    </div>
  );
}