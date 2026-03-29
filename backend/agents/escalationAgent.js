export const checkEscalation = (tasks) => {
  const now = new Date();

  return tasks.map(t => {
    if (new Date(t.deadline) < now && t.status !== "completed") {
      return { ...t._doc, alert: "⚠️ Overdue - Escalate" };
    }
    return t;
  });
};