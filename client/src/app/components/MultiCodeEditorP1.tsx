import { useState, useEffect, useRef } from "react";
import Timer from "./Timer";
import io from "socket.io-client";

type CodeEditorProps = {
  codeSnippet: string[];
  onNextSnippet: () => void;
  selectedLanguage: string;
  roomId: string;
  socket: any;
};

type ColorStatus = "correct" | "incorrect" | "not-reached";

const MultiCodeEditorP1 = ({
  codeSnippet,
  onNextSnippet,
  selectedLanguage,
  roomId,
  socket,
}: CodeEditorProps) => {
  const [userInputP1, setUserInputP1] = useState("");
  const inputRef = useRef<any | null>(null);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingEnded, setTypingEnded] = useState(false);
  const [errors, setErrors] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [precision, setPrecision] = useState(100);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    socket.connect()
    socket.on("receiveTypeValueP1", (message: any) => {
      setUserInputP1(message.value);
    });

    return () => {
      socket.off("receiveTypeValueP1");
    };
  }, [socket]);

  useEffect(() => {
    setUserInputP1("");
    setTypingStarted(false);
    setTypingEnded(false);
    setResetTimer(false);
  }, [selectedLanguage, codeSnippet]);

  useEffect(() => {
    let newCorrectChars = 0;
    let newIncorrectChars = 0;
    for (let i = 0; i < codeSnippet.length; i++) {
      if (userInputP1[i] === codeSnippet[i]) {
        newCorrectChars++;
      } else {
        newIncorrectChars++;
      }
    }

    const totalCharsTyped = userInputP1.length;
    const precisionPercentage =
      totalCharsTyped === 0
        ? 100
        : ((totalCharsTyped - newIncorrectChars) / totalCharsTyped) * 100;

    setCorrectChars(newCorrectChars);
    setErrors(newIncorrectChars);
    setPrecision(precisionPercentage);
  }, [userInputP1, codeSnippet]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    if (!typingStarted) {
      setTypingStarted(true);
    }

    const cursorPosition = e.target.selectionStart;
    const typedValueByUser = e.target.value;

    setUserInputP1(typedValueByUser);

    if (typedValueByUser.length === codeSnippet.length) {
      setTypingEnded(true);
    }

    socket.emit("sendTypeValueP1", {
      value: typedValueByUser,
      roomId: roomId,
      userId: socket.id,
    });
    inputRef.current!.setSelectionRange(cursorPosition, cursorPosition);
  };

  const handleNextSnippetButton = () => {
    setUserInputP1("");
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
    if (codeSnippetIndex < userInputP1.length) {
      return userInputP1[codeSnippetIndex] === char ? "correct" : "incorrect";
    } else {
      return "not-reached";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (codeSnippet[userInputP1.length] === "\t" && e.key !== "Tab") {
      if (e.key !== "Backspace") {
        e.preventDefault();
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();

      if (codeSnippet[userInputP1.length] !== "\t") {
        e.preventDefault();
      } else {
        const { selectionStart, selectionEnd } = e.currentTarget;
        const newInput =
          userInputP1.substring(0, selectionStart) +
          "\t" +
          userInputP1.substring(selectionEnd);

        setUserInputP1(newInput);

        const newCursorPosition = selectionStart + 1;
        inputRef.current!.setSelectionRange(
          newCursorPosition,
          newCursorPosition,
        );
      }
    } else if (codeSnippet[userInputP1.length] === "\n" && e.key !== "Enter") {
      if (e.key !== "Backspace") {
        e.preventDefault();
      }
    } else if (codeSnippet[userInputP1.length] !== "\n" && e.key === "Enter") {
      e.preventDefault();
    } else if (codeSnippet[userInputP1.length] !== " " && e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div>
      {typingEnded ? (
        <div className="flex w-full flex-col items-center">
          <div className="z-49 absolute inset-0 opacity-50"></div>
          <div className="relative z-50">
            <p>Typing Ended!</p>
            <p>Errors: {errors}</p>
            <p>Correct Chars: {correctChars}</p>
            <p>Precision: {precision.toFixed(2)}%</p>
            <div className="resetButton" onClick={handleNextSnippetButton}>
              <button>Next snippet</button>
            </div>
          </div>
          <div>
            <small>Press alt + tab to focus this button directly</small>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <Timer
              typingStarted={typingStarted}
              typingEnded={typingEnded}
              resetTimer={resetTimer}
            />
          </div>
          <div className="w-200 relative m-5 flex h-[100vh] justify-center font-mono text-2xl">
            <div className="w-full">
              <textarea
                cols={100}
                rows={10}
                ref={inputRef}
                className="absolute z-10 h-full w-full resize-none rounded-sm border border-gray-600 bg-transparent p-5 text-black text-opacity-0"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={userInputP1}
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
    </div>
  );
};

export default MultiCodeEditorP1;
