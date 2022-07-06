import { createContext, useMemo, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

export enum Language {
  EN = "en-EN",
  PT = "pt-PT"
};

type TranslationContextType = {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children } : { children: ReactNode}) {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const memoizedState = useMemo(() => ({language, setLanguage}), [language]);
  
  return (
    <TranslationContext.Provider value={memoizedState}>
      { children }
    </TranslationContext.Provider>
  );
};