import { useEffect, useState } from "react"

function DashboardMainText() {
    const [displayText, setDisplayText] = useState(""); // For showing the current text
    const [phase, setPhase] = useState(1); // To control which phase we are in (typing, clearing, etc.)
    const [index, setIndex] = useState(0); // Keeps track of the current position in the text
  
    const text1 = "მძღოლი"; // First text
    const text2 = "დისპეტჩერი"; // Second text
  
    useEffect(() => {
      let typingInterval;
  
      if (phase === 1) {
        // Typing phase: Typing text1
        typingInterval = setInterval(() => {
          if (index < text1.length) {
            setDisplayText((prevText) => prevText + text1[index]);
            setIndex((prevIndex) => prevIndex + 1);
          } else {
            clearInterval(typingInterval); // Stop typing once the first text is fully typed
            setTimeout(() => setPhase(2), 500); // Wait a moment before starting to clear text
          }
        }, 100); // Adjust typing speed here
      } else if (phase === 2) {
        // Clearing phase: Clear text1
        typingInterval = setInterval(() => {
          if (index > 0) {
            setDisplayText((prevText) => prevText.slice(0, -1)); // Remove one character
            setIndex((prevIndex) => prevIndex - 1);
          } else {
            clearInterval(typingInterval); // Stop clearing once all characters are removed
            setTimeout(() => setPhase(3), 500); // Wait a moment before typing the second text
          }
        }, 100); // Adjust clearing speed here
      } else if (phase === 3) {
        // Typing phase: Typing text2
        typingInterval = setInterval(() => {
          if (index < text2.length) {
            setDisplayText((prevText) => prevText + text2[index]);
            setIndex((prevIndex) => prevIndex + 1);
          } else {
            clearInterval(typingInterval); // Stop typing once the second text is fully typed
            setTimeout(() => setPhase(4), 500); // Wait a moment before starting to clear text2
          }
        }, 100); // Adjust typing speed here
      } else if (phase === 4) {
        // Clearing phase: Clear text2
        typingInterval = setInterval(() => {
          if (index > 0) {
            setDisplayText((prevText) => prevText.slice(0, -1)); // Remove one character
            setIndex((prevIndex) => prevIndex - 1);
          } else {
            clearInterval(typingInterval); // Stop clearing once all characters are removed
            setTimeout(() => setPhase(1), 500); // Wait a moment before starting phase 1 again (loop)
          }
        }, 100); // Adjust clearing speed here
      }
  
      return () => clearInterval(typingInterval); // Clean up interval when the component unmounts or phase changes
    }, [index, phase]); // Dependency array: Runs whenever index or phase changes


  return (
    <div className={phase === 1 || phase === 2 ? 'text-[#1594D3]' : 'text-[#0c4c83]'}>{displayText}</div>
  )
}

export default DashboardMainText
