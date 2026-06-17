import { v4 as uuidv4 } from "uuid";

const names = [
  "Tiger",
  "Falcon",
  "Pixel",
  "Nova",
  "Storm",
  "Rocket",
  "Shadow",
  "Blaze",
];

const colors = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EC4899",
];

export const getUser = () => {
  const existing = localStorage.getItem("gridUser");

  if (existing) {
    return JSON.parse(existing);
  }

  const user = {
    id: uuidv4(),
    name: names[Math.floor(Math.random() * names.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  };

  localStorage.setItem("gridUser", JSON.stringify(user));

  return user;
};