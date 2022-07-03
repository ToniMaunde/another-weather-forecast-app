export default function LanguageSwitcher() {
  // TODO: Get state from context
  const currentLanguage = "EN";
  return (
    <select
      className="w-fit p-1 rounded bg-[#20212B] text-light cursor-pointer"
      name="languageSelector"
      id="languageSelector"
    >
      <option value="en">EN</option>
      <option value="pt">PT</option>
    </select>
  )
}