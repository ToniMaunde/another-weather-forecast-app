import { useContext } from "react";
import { TranslationContext } from "../providers/translationProvider";
import translation from "../utils/translation";

export default function Footer() {
  const languageContext = useContext(TranslationContext);

  return (
    <footer className="px-7 mt-auto mb-8 flex flex-col text-secondary">
      <p className="font-semibold text-primary">Weather App</p>
      <a
        href="https://github.com/ToniMaunde/another-weather-forecast-app"
        target="_blank"
        rel="noreferrer"
      >
        {
          languageContext?.language === "en-EN"
            ? translation.en.footer.githubRepo
            : translation.pt.footer.githubRepo
        }&#128279;
      </a>
      <p className="mt-4 font-semibold text-primary">
        {
          languageContext?.language === "en-EN"
            ? translation.en.footer.authorLabel
            : translation.pt.footer.authorLabel
        }
      </p>
      <a
        href="https://miltondavid.com/"
        target="_blank"
        rel="noreferrer"
      >
        {
          languageContext?.language === "en-EN"
            ? translation.en.footer.authorSite
            : translation.pt.footer.authorSite
        }&#128279;
      </a>
      <a
        href="https://github.com/ToniMaunde"
        target="_blank"
        rel="noreferrer"
      >
        {
          languageContext?.language === "en-EN"
            ? translation.en.footer.authorGitHubProfile
            : translation.pt.footer.authorGitHubProfile
        }&#128279;
      </a>
    </footer>
  )
}