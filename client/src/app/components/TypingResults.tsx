const TypingResults = ({errors, correctChars, precision, handleNextSnippetButton}: any) => {
  return (
    <div>
          <div className="flex w-full items-center flex-col gap-2">
            <p>✅ Correct Chars: {correctChars}</p>
            <p>❌ Errors: {errors}</p>
            <p>➕ Precision: {precision.toFixed(2)}%</p>
            <div className="resetButton" onClick={handleNextSnippetButton}>
              <button>Next snippet</button>
            </div>
          <div>
            <small>Press alt + tab to focus this button directly</small>
          </div>
          </div>
        </div>
  )
}


export default TypingResults