import { useEffect, useState } from "react";

export function useTheme(userTheme: string) {
  const [theme, setTheme] = useState(userTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else document.documentElement.classList.remove("dark");
  },[theme]);

  return { theme, setTheme };
};