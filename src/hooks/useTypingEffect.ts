import { useState, useEffect } from "react";

interface Config {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  nextDelay?: number;
}

export default function useTypingEffect(
  texts: string[],
  active: boolean,
  { typeSpeed = 100, deleteSpeed = 100, pauseDuration = 3000, nextDelay = 500 }: Config = {}
): string {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    let timeout: NodeJS.Timeout;
    const current = texts[textIndex];

    if (phase === "typing") {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setTyped(current.slice(0, charIndex + 1));
          setCharIndex(ci => ci + 1);
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setTyped(current.slice(0, charIndex - 1));
          setCharIndex(ci => ci - 1);
        }, deleteSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhase("typing");
          setTextIndex(ti => (ti + 1) % texts.length);
        }, nextDelay);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    active,
    texts,
    textIndex,
    charIndex,
    phase,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    nextDelay,
  ]);

  return typed;
}
