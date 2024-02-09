"use client";
import { useState, useMemo, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import MultiCodeEditorP2 from "../components/MultiCodeEditorP2";
import MultiCodeEditorP1 from "../components/MultiCodeEditorP1";
import { snippets } from "../../../public/codeSnippets";
import JoinMultiRoom from "../components/JoinMultiRoom";
import HeroMain from "../components/HeroMain";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [randomIndex, setRandomIndex] = useState(0);
  const [showJoinRoom, setShowJoinRoom] = useState(true);
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState(null);

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
      {showJoinRoom ? (
        <JoinMultiRoom
          showJoinRoom={showJoinRoom}
          setShowJoinRoom={setShowJoinRoom}
          setRoomId={setRoomId}
          setSocket={setSocket}
        />
      ) : (
        <>
          <HeroMain
            selectedLanguage={selectedLanguage}
            handleLanguageChange={handleLanguageChange}
          />
          <div className="flex w-full">
            <div className="w-[50%]">
              <MultiCodeEditorP1
                codeSnippet={codeSpacesReplacedWithTabs.split("")}
                onNextSnippet={handleNextSnippet}
                selectedLanguage={selectedLanguage}
                roomId={roomId}
                socket={socket}
              />
            </div>
            <div className="w-[50%]">
              <MultiCodeEditorP2
                codeSnippet={codeSpacesReplacedWithTabs.split("")}
                onNextSnippet={handleNextSnippet}
                selectedLanguage={selectedLanguage}
                roomId={roomId}
                socket={socket}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
