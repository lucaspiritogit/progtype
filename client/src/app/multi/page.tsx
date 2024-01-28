"use client";
import { useState, useMemo, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import MultiCodeEditor from "../components/MultiCodeEditor";
import MultiCodeEditorP1 from "../components/MultiCodeEditorP1";
import { snippets } from "../../../public/codeSnippets";
import JoinMultiRoom from "../components/JoinMultiRoom";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [randomIndex, setRandomIndex] = useState(0);
  const [showJoinRoom, setShowJoinRoom] = useState(true)
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState(null);
  const [isPlayer1, setIsPlayer1] = useState(false);


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
          <div className="flex flex-col items-center justify-center p-10">
            <h1 className="m-1 text-4xl">Progtype</h1>
            <p className="m-0">Use Tab to indent correctly, spaces comming soon™️</p>
            <div className="m-5 flex flex-col items-center">
              <label htmlFor="lang">Choose a programming language to type on:</label>
              <div>
                <select
                  className="m-3 text-black"
                  name="lang"
                  id="lang"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="javascript">Javascript</option>
                  <option value="typescript">Typescript</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                </select>
              </div>
            </div>
          </div>
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
              <MultiCodeEditor
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
