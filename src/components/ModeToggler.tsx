import type { MouseEvent } from "react";
import { Icon } from "./Icon"
import darkModeIcon from "../assets/darkMode"
import lightModeIcon from "../assets/lightMode"
import { useTheme } from "../utils/useTheme";
import { getTheme } from "../utils";

export default function ModeToggler(props: {className: string | undefined}) {
  const { className } = props;
  const { theme, setTheme }= useTheme(getTheme());

  function handleClick(event: MouseEvent<SVGElement>) {
    const newThemeValue = event.currentTarget.dataset.icon as string;
    if (newThemeValue) {
      setTheme(newThemeValue);
    }
  };

  return (
    <>
      {
        theme === "dark"
          ? <Icon
              key="dark"
              {...darkModeIcon}
              onClick={handleClick}
              data-icon="light"
              className={className}
            />
          : <Icon
              key="light"
              {...lightModeIcon}
              onClick={handleClick}
              data-icon="dark"
              className={className}
            />
      }
    </>
  )
}