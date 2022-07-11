import { Icon } from "./Icon";
import logoIcon from "../assets/logo";
import ModeToggler from "./ModeToggler";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="py-4 px-7 flex items-center">
      <div className="flex text-secondary items-center">
        Weather&nbsp;<span className="font-semibold text-primary">App</span>
        <Icon {...logoIcon} customClasses="ml-1 flex-shrink-0 w-7 h-auto fill-primary"/>
      </div>
      <ModeToggler classes="ml-auto mr-6 cursor-pointer" />
      <LanguageSwitcher />
    </nav>
  )
}