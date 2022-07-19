import type { MouseEvent } from "react";
import { Icon } from "./Icon"
import darkModeIcon from "../assets/darkMode"
import lightModeIcon from "../assets/lightMode"
import { useTheme } from "../utils/useTheme";
import { getTheme } from "../utils";

export default function ModeToggler(props: {classes: string}) {
  const { classes } = props;
  const { theme, setTheme }= useTheme(getTheme())

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
              customClasses={`w-6 fill-secondary h-auto ${classes}`}
            />
          : <Icon
              key="light"
              {...lightModeIcon}
              onClick={handleClick}
              data-icon="dark"
              customClasses={`w-6 fill-secondary h-auto ${classes}`}
            />
      }
    </>
  )
}