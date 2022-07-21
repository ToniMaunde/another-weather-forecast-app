import { Icon } from "./Icon";
import logoIcon from "../assets/logo";
import ModeToggler from "./ModeToggler";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="py-4 px-7 flex items-center">
      <div className="flex text-secondary items-center text-light-primary dark:text-white">
        Weather&nbsp;
        <span className="font-semibold text-light-secondary dark:text-dark-primary">
          App
        </span>
        <Icon
          {...logoIcon}
          className="cursor-pointer ml-1 flex-shrink-0 w-7 h-auto fill-light-secondary dark:fill-dark-primary"/>
      </div>
      <ModeToggler
        className="w-6 h-auto ml-auto mr-6 fill-light-primary dark:fill-white cursor-pointer"
      />
      <LanguageSwitcher />
    </nav>
  )
}