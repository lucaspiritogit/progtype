const HeroMain = ({ selectedLanguage, handleLanguageChange }: any) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="m-1 text-4xl">Progtype</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-5">
        <p className="m-0">
          Use tab to indent correctly, spaces comming soon-<small>ish?</small>
        </p>
        <div className="m-5 flex flex-col items-center">
          <label htmlFor="lang">
            Choose a programming language to type on:
          </label>
          <div>
            <select
              className="m-3 rounded p-2 text-black"
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
    </div>
  );
};

export default HeroMain;
