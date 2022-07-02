import { Icon } from "./Icon";
import logoIcon from "../assets/logo";
import ModeToggler from "./ModeToggler";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="py-4 px-7 flex items-center">
      <div className="flex text-secondary items-center">
        <Icon {...logoIcon} customClasses="mr-1 flex-shrink-0 w-7 h-auto fill-primary"/>
        Weather&nbsp;<span className="font-semibold text-primary">App</span>
      </div>

      <ModeToggler classes="ml-auto mr-6 cursor-pointer" />

      <LanguageSwitcher />
    </nav>
  )
}