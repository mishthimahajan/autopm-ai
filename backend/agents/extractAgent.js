import fetch from "node-fetch";

// export const extractTasks = async (transcript) => {
//   const prompt = `
// Extract tasks from the meeting transcript.

// Return STRICT JSON:
// [
//  { "title": "", "assignee": "", "deadline": "" }
// ]

// Transcript:
// ${transcript}
// `;

//   const response = await fetch("http://localhost:11434/api/generate", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "llama3",
//       prompt: prompt,
//       stream: false,
//     }),
//   });

//   const data = await response.json();

//   try {
//     return JSON.parse(data.response);
//   } catch (err) {
//     console.log("Parsing error:", data.response);
//     return [];
//   }
// };

// export function extractTasks(transcript) {
//   const lines = transcript.split("\n").filter(line => line.trim() !== "");

//   const tasks = lines.map(line => {
//     const words = line.split(" ");

//     let assignee = words[0];

//     // find "by" keyword
//     let byIndex = words.findIndex(word => word.toLowerCase() === "by");

//     let deadline = byIndex !== -1 ? words[byIndex + 1] : "No deadline";

//     let title = words
//       .slice(1, byIndex !== -1 ? byIndex : words.length)
//       .join(" ")
//       .replace("will", "")
//       .trim();

//     return {
//       title,
//       assignee,
//       deadline,
//       status: "pending",
//       priority: "medium",
//     };
//   });

//   return tasks;
// }

export function extractTasks(transcript) {
  const lines = transcript.split("\n").filter(l => l.trim() !== "");

  return lines.map(line => {
    const lower = line.toLowerCase();

    // 👤 Extract name (first word capital assumed)
    const words = line.split(" ");
    const assignee = words[0];

    // ⏰ Deadline detection
    let deadline = "Not specified";
    if (lower.includes("tomorrow")) deadline = "Tomorrow";
    else if (lower.includes("today")) deadline = "Today";
    else if (lower.includes("next week")) deadline = "Next Week";
    else {
      const byIndex = words.findIndex(w => w.toLowerCase() === "by");
      if (byIndex !== -1) deadline = words[byIndex + 1];
    }

    // 🔥 Priority detection
    let priority = "medium";
    if (lower.includes("urgent") || lower.includes("asap")) priority = "high";
    if (lower.includes("later") || lower.includes("low")) priority = "low";

    // 🧠 Title extraction (clean sentence)
    let title = line
      .replace(assignee, "")
      .replace(/by .*/i, "")
      .replace(/please|will|kindly|urgently|asap/gi, "")
      .trim();

    return {
      title: title || "General task",
      assignee,
      deadline,
      priority,
      status: "pending",
    };
  });
}