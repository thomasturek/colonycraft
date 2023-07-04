import { useState, useEffect } from "react";

const useTypewriterEffect = (phrases, speed) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex];
      const changePhrase = () => {
        setPhraseIndex((prevPhraseIndex) =>
          prevPhraseIndex + 1 === phrases.length ? 0 : prevPhraseIndex + 1
        );
      };

      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));

        if (text.length === 10) {
          setIsDeleting(false);
          changePhrase();
        }
      } else {
        setText(currentPhrase.substring(0, text.length) + currentPhrase.substring(text.length, text.length + 1));

        if (text.length === currentPhrase.length) {
          setIsDeleting(true);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, speed]);

  return text;
};

export default useTypewriterEffect;
