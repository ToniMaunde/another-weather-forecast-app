type TranslationLanguage = {
  form: {
    measurementLabel: string;
    cityLabel: string; 
  };
  info: string;
  footer: {
    githubRepo: string;
    authorLabel: string;
    authorSite: string;
    authorGitHubProfile: string
  }
};

export type TranslationType = {
  en: TranslationLanguage;
  pt: TranslationLanguage;
};

const translation: TranslationType = {
  en: {
    form: {
      measurementLabel: "Temperature in ",
      cityLabel: "City"
    },
    info: "Weather forecast for five days in 3-hour intervals for ",
    footer: {
      githubRepo: "github repository",
      authorLabel: "Author",
      authorSite: "personal website",
      authorGitHubProfile: "github profile"
    }
  },
  pt: {
    form: {
      measurementLabel: "Temperatura em ",
      cityLabel: "Cidade"
    },
    info: "Previsao metereologica para cinco dias em intervalos de 3 horas para ",
    footer: {
      githubRepo: "repositorio github",
      authorLabel: "Autor",
      authorSite: "site pessoal",
      authorGitHubProfile: "perfil no github"
    }
  },
};

export { translation };