import { TranslationContextType } from "../providers/translationProvider";
import type { TranslationType } from "../utils/translation";

type FooterProps = {
  languageContext: TranslationContextType | null;
  translation: TranslationType
}

export default function Footer(props: FooterProps) {
  const { languageContext, translation } = props;

  return (
    <footer className="px-7 mt-auto mb-8 flex flex-col text-light-primary dark:text-white">
      <p className="font-semibold text-light-secondary dark:text-dark-primary">Weather App</p>
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
      <p className="mt-4 font-semibold text-light-secondary dark:text-dark-primary">
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