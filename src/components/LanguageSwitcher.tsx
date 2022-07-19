import { useContext } from "react";
import type { ChangeEvent } from "react";
import { TranslationContext } from "../providers/translationProvider";
import type { Language } from "../providers/translationProvider";

export default function LanguageSwitcher() {
  const languageContext = useContext(TranslationContext);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    languageContext?.setLanguage(value as Language)
  };

  return (
    <select
      className="w-fit p-1 rounded text-light-primary dark:text-white bg-light-background dark:bg-dark-background cursor-pointer"
      name="languageSelector"
      id="languageSelector"
      onChange={handleChange}
    >
      <option
        value="en-EN"
        defaultChecked={languageContext?.language === "en-EN"}
      >
        EN
      </option>
      <option
        value="pt-PT"
        defaultChecked={languageContext?.language === "pt-PT"}
      >
        PT
      </option>
    </select>
  )
}