import { Icon } from "./Icon"
import darkModeIcon from "../assets/darkMode"
import lightModeIcon from "../assets/lightMode"

export default function ModeToggler(props: {classes: string}) {
  const { classes } = props;
  // TODO: Get this state from context
  const mode = "dark";

  if (mode === "dark") {
    return (
      <Icon
        key="dark"
        {...darkModeIcon} customClasses={`w-6 fill-secondary h-auto ${classes}`}/>
    )
  }

  return (
    <Icon
      key="light"
      {...lightModeIcon}
      customClasses={`w-6 fill-secondary h-auto ${classes}`}
    />
  )
}