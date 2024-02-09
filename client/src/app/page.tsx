"use client";
import { useState, useMemo, useEffect } from "react";
import CodeEditor from "./components/CodeEditor";
import { snippets } from "../../public/codeSnippets";
import HeroMain from "./components/HeroMain";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [randomIndex, setRandomIndex] = useState(0);

  const handleLanguageChange = (e: any) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCodeSnippet(getRandomSnippet(newLanguage));
  };

  const getRandomSnippet = (language: string) => {
    const filteredSnippets = snippets.filter(
      (snippet) => snippet.language === language,
    );
    let currentIndex;

    do {
      currentIndex = Math.floor(Math.random() * filteredSnippets.length);
    } while (currentIndex === randomIndex);

    setRandomIndex(currentIndex);
    return filteredSnippets[currentIndex].code;
  };

  const [codeSnippet, setCodeSnippet] = useState(() =>
    getRandomSnippet(selectedLanguage),
  );

  const codeSpacesReplacedWithTabs = codeSnippet
    .replace(/    /g, "\t")
    .replace(/  /g, "\t");

  const handleNextSnippet = () => {
    setCodeSnippet(getRandomSnippet(selectedLanguage));
  };

  return (
    <div>
      <HeroMain selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange} />
      <CodeEditor
        codeSnippet={codeSpacesReplacedWithTabs.split("")}
        onNextSnippet={handleNextSnippet}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
}
