import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function Chart({ tasks }) {
  const data = [
    { name: "Completed", value: tasks.filter(t => t.status === "completed").length },
    { name: "Pending", value: tasks.filter(t => t.status !== "completed").length },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-xl">
      <h2 className="text-lg font-bold mb-2 text-white">📊 Task Analytics</h2>

      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" outerRadius={80}>
          <Cell fill="#22c55e" />
          <Cell fill="#f59e0b" />
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}