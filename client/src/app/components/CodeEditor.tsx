import { useState, useEffect, useRef } from "react";
import Timer from "./Timer";
import TypingResults from "./TypingResults";

type CodeEditorProps = {
  codeSnippet: string[];
  onNextSnippet: () => void;
  selectedLanguage: string;
};

type ColorStatus = "correct" | "incorrect" | "not-reached";

const CodeEditor = ({
  codeSnippet,
  onNextSnippet,
  selectedLanguage,
}: CodeEditorProps) => {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<any | null>(null);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingEnded, setTypingEnded] = useState(false);
  const [errors, setErrors] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [precision, setPrecision] = useState(100);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    setUserInput("");
    setTypingStarted(false);
    setTypingEnded(false);
    setResetTimer(false);
    inputRef.current.focus();
  }, [selectedLanguage, codeSnippet]);

  useEffect(() => {
    let newCorrectChars = 0;
    let newIncorrectChars = 0;
    for (let i = 0; i < codeSnippet.length; i++) {
      if (userInput[i] === codeSnippet[i]) {
        newCorrectChars++;
      } else {
        newIncorrectChars++;
      }
    }

    setCorrectChars(newCorrectChars);
    setErrors(newIncorrectChars);

    const totalCharsTyped = userInput.length;
    const precisionPercentage =
      totalCharsTyped === 0
        ? 100
        : ((totalCharsTyped - newIncorrectChars) / totalCharsTyped) * 100;
    setPrecision(precisionPercentage);
  }, [userInput, codeSnippet]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    if (!typingStarted) {
      setTypingStarted(true);
    }

    // const cursorPosition = e.target.selectionStart;
    const typedValueByUser = e.target.value;

    setUserInput(typedValueByUser);

    if (typedValueByUser.length === codeSnippet.length) {
      setTypingEnded(true);
    }
    // inputRef.current!.setSelectionRange(cursorPosition, cursorPosition);
  };

  const handleNextSnippetButton = () => {
    setUserInput("");
    setTypingEnded(false);
    setTypingStarted(false);
    setResetTimer(true);
    onNextSnippet();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const colorCharByStatus = (
    codeSnippetIndex: number,
    char: any,
  ): ColorStatus => {
    if (codeSnippetIndex < userInput.length) {
      return userInput[codeSnippetIndex] === char ? "correct" : "incorrect";
    } else {
      return "not-reached";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let currentUserPosition = userInput.length;

    if (codeSnippet[currentUserPosition] === "\t" && e.key !== "Tab") {
      if (e.key !== "Backspace") {
        e.preventDefault();
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();

      if (codeSnippet[userInput.length] !== "\t") {
        e.preventDefault();
      } else {
        const { selectionStart, selectionEnd } = e.currentTarget;
        const newInput =
          userInput.substring(0, selectionStart) +
          "\t" +
          userInput.substring(selectionEnd);

        setUserInput(newInput);

        const newCursorPosition = selectionStart + 1;
        inputRef.current!.setSelectionRange(
          newCursorPosition,
          newCursorPosition,
        );
      }
    } else if (codeSnippet[userInput.length] === "\n" && e.key !== "Enter") {
      if (e.key !== "Backspace") {
        e.preventDefault();
      }
    } else if (codeSnippet[userInput.length] !== "\n" && e.key === "Enter") {
      e.preventDefault();
    } else if (codeSnippet[userInput.length] !== " " && e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Timer
          typingStarted={typingStarted}
          typingEnded={typingEnded}
          resetTimer={resetTimer}
        />
      </div>
      {typingEnded ? (
        <TypingResults errors={errors} correctChars={correctChars} precision={precision} handleNextSnippetButton={handleNextSnippetButton}/>
      ) : (
        <>
          <div className="w-200 relative m-5 flex h-[100vh] justify-center font-mono text-2xl">
            <div className="w-full">
              <textarea
                cols={100}
                rows={10}
                ref={inputRef}
                className="absolute z-10 h-full w-full resize-none rounded-sm border border-gray-600 bg-transparent p-5 text-black caret-slate-200 text-opacity-0"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={userInput}
              />
            </div>
            <div>
              <pre className="absolute left-0 top-0 z-0 w-full p-5">
                {codeSnippet.map((char, index) => (
                  <span key={index} className={colorCharByStatus(index, char)}>
                    {char}
                  </span>
                ))}
              </pre>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CodeEditor;
