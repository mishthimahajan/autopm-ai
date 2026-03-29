// import { useState } from "react";
// import axios from "axios";
// import Sidebar from "./components/Sidebar";
// import TaskCard from "./components/TaskCard";
// import Chart from "./components/Chart";
// import toast, { Toaster } from "react-hot-toast";


// export default function App() {
//   const [transcript, setTranscript] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [allTasks, setAllTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [dark, setDark] = useState(false);
//   const [page, setPage] = useState("dashboard");

//   const processMeeting = async () => {
//     setLoading(true);
//     const res = await axios.post("http://localhost:5000/api/tasks/process", { transcript });
//     setTasks(res.data);
//     setAllTasks(res.data);
//     setLoading(false);
//   };

//   const markComplete = (index) => {
//     const updated = [...tasks];
//     updated[index].status = "completed";
//     setTasks(updated);
//     setAllTasks(updated);
//   };

//   const startVoice = () => {
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.onresult = (event) => {
//       setTranscript(event.results[0][0].transcript);
//     };
//     recognition.start();
//   };
//   const deleteTask = (index) => {
//   const updated = tasks.filter((_, i) => i !== index);
//   setTasks(updated);
//   setAllTasks(updated);
// };

//   return (
//     <div className={`flex min-h-screen ${
//       dark
//         ? "bg-linear-to-br from-gray-900 via-gray-800 to-black text-white"
//         : "bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
//     }`}>

//       <Sidebar dark={dark} setDark={setDark} setPage={setPage} />

//       <div className="flex-1 p-6">

//         <h1 className="text-4xl font-bold mb-6">🤖 AutoPM AI</h1>

//         {/* DASHBOARD */}
//         {page === "dashboard" && (
//           <>
//             <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl">
//               <textarea
//                 className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200"
//                 rows="4"
//                 placeholder="Paste meeting transcript..."
//                 value={transcript}
//                 onChange={(e) => setTranscript(e.target.value)}
//               />

//               <div className="flex gap-4 mt-4">
//                 <button
//                   onClick={processMeeting}
//                   className="bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-xl"
//                 >
//                   {loading ? "Processing..." : "⚡ Process"}
//                 </button>

//                 <button
//                   onClick={startVoice}
//                   className="bg-linear-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-xl"
//                 >
//                   🎤 Voice
//                 </button>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Chart tasks={tasks} />
//             </div>
//           </>
//         )}

//         {/* TASKS */}
//         {page === "tasks" && (
//           <div className="grid md:grid-cols-3 gap-6">
//             {tasks.map((task, i) => (
//               <TaskCard
//   key={i}
//   task={task}
//   markComplete={() => markComplete(i)}
//   deleteTask={() => deleteTask(i)}
// />
//             ))}
//           </div>
//         )}

//         {/* ANALYTICS */}
//         {page === "analytics" && (
//           <div className="mt-6">
//             <Chart tasks={tasks} />
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";
import Chart from "./components/Chart";
import toast, { Toaster } from "react-hot-toast";

// 🔐 Firebase
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null); // ✅ NEW

  const [transcript, setTranscript] = useState("");
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("dashboard");

  // 🔐 LOGIN FUNCTION
  const login = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    setUser(result.user);
  } catch (err) {
    console.log("ERROR:", err);
  }
};

  // 🚀 PROCESS MEETING
  const processMeeting = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://autopm-ai.onrender.com",
        { transcript }
      );
      setTasks(res.data);
      setAllTasks(res.data);
      toast.success("Tasks generated!");
    } catch (err) {
      toast.error("Error processing meeting");
    }
    setLoading(false);
  };

  // ✅ COMPLETE TASK
  const markComplete = (index) => {
    const updated = [...tasks];
    updated[index].status = "completed";
    setTasks(updated);
    setAllTasks(updated);
    toast.success("Task completed!");
  };

  // 🗑 DELETE TASK
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    setAllTasks(updated);
    toast.error("Task deleted");
  };

  // 🎤 VOICE INPUT
  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
    };
    recognition.start();
  };

  // 🔥 LOGIN SCREEN
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-linear-to-r from-indigo-600 to-pink-600">
        <div className="bg-white/20 backdrop-blur-xl p-10 rounded-2xl text-center shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-6">
            🤖 AutoPM AI
          </h1>

          <button
            onClick={login}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            🔐 Login with Google
          </button>
        </div>
      </div>
    );
  }

  // 🚀 MAIN APP
  return (
    <div
      className={`flex min-h-screen ${
        dark
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
      }`}
    >
      <Toaster />

      <Sidebar dark={dark} setDark={setDark} setPage={setPage} />

      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-2">🤖 AutoPM AI</h1>
        <p className="mb-4">👋 Welcome, {user.displayName}</p>

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl">
              <textarea
                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200"
                rows="4"
                placeholder="Paste meeting transcript..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />

              <div className="flex gap-4 mt-4">
                <button
                  onClick={processMeeting}
                  className="bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-xl"
                >
                  {loading ? "Processing..." : "⚡ Process"}
                </button>

                <button
                  onClick={startVoice}
                  className="bg-linear-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-xl"
                >
                  🎤 Voice
                </button>
              </div>
            </div>

            <div className="mt-6">
              <Chart tasks={tasks} />
            </div>
          </>
        )}

        {/* TASKS */}
        {page === "tasks" && (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {tasks.map((task, i) => (
              <TaskCard
                key={i}
                task={task}
                markComplete={() => markComplete(i)}
                deleteTask={() => deleteTask(i)}
              />
            ))}
          </div>
        )}

        {/* ANALYTICS */}
        {page === "analytics" && (
          <div className="mt-6">
            <Chart tasks={tasks} />
          </div>
        )}
      </div>
    </div>
  );
}