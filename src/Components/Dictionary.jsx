import React, { useState } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Dictionary() {
  const [word, setWord] = useState({});
  const [audioUrl, setAudioUrl] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const playSound = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const handleSetWord = (data) => {
    setWord(data[0]);
    const audio = data[0]?.phonetics?.find((phonetic) => phonetic.audio);
    setAudioUrl(audio ? audio.audio : "");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full min-h-screen dark:bg-[#050505] dark:text-white">
        <div className="w-11/12 sm:w-10/12 mx-auto p-8 sm:p-16">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <SearchBar setWord={handleSetWord} />

          {word.word && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left mb-5 sm:mb-0">
                  <h1 className="text-4xl sm:text-6xl">{word.word}</h1>
                  <p className="text-[#a162ca] text-lg sm:text-xl my-5">
                    {word.phonetics?.find((phonetic) => phonetic.text)?.text ||
                      "Phonetic not available"}
                  </p>
                </div>
                <div
                  className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex justify-center items-center bg-[#e8cefb] dark:bg-[#31123e] cursor-pointer"
                  onClick={playSound}
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="text-[#9a44dd] dark:text-[#a644ef] text-lg sm:text-xl"
                  />
                </div>
              </div>

              {word.meanings?.map((meaning, meaningIndex) => (
                <div key={meaningIndex} className="py-8">
                  <div className="flex items-center">
                    <p className="font-bold text-lg sm:text-xl mr-5">
                      {meaning.partOfSpeech}
                    </p>
                    <hr className="bg-gray-500 block w-full" />
                  </div>

                  <p className="text-[#aaaaaa] dark:text-[#d1d1d1] text-base sm:text-lg font-semibold mt-4">
                    Meaning
                  </p>
                  <ul className="list-disc pl-5">
                    {meaning.definitions?.map((definition, index) => (
                      <li key={index} className="mb-3">
                        <p>{definition.definition}</p>
                      </li>
                    ))}
                  </ul>

                  {meaning.synonyms?.length > 0 && (
                    <div className="py-4 flex flex-wrap space-x-3">
                      <p className="text-[#aaaaaa] dark:text-[#d1d1d1] text-base sm:text-lg font-semibold">
                        Synonyms
                      </p>
                      {meaning.synonyms.map((synonym, index) => (
                        <p
                          className="text-[#8e56c5] dark:text-[#e1bee7] text-base sm:text-lg font-semibold"
                          key={index}
                        >
                          {synonym}
                        </p>
                      ))}
                    </div>
                  )}

                  {meaning.antonyms?.length > 0 && (
                    <div className="py-4 flex flex-wrap space-x-3">
                      <p className="text-[#aaaaaa] dark:text-[#d1d1d1] text-base sm:text-lg font-semibold">
                        Antonyms
                      </p>
                      {meaning.antonyms.map((antonym, index) => (
                        <p
                          className="text-[#8e56c5] dark:text-[#e1bee7] text-base sm:text-lg font-semibold"
                          key={index}
                        >
                          {antonym}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="py-4">
                <p className="text-sm">
                  Source:{" "}
                  <a
                    href={word.sourceUrls ? word.sourceUrls[0] : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#a162ca] dark:text-[#e1bee7]"
                  >
                    {word.sourceUrls
                      ? word.sourceUrls[0]
                      : "Source not available"}
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
