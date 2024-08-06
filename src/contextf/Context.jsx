/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import run from "../config/grmini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextword) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextword);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    if (prompt) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = responseArray
      .map((item, index) => (index % 2 === 1 ? `<b>${item}</b>` : item))
      .join("");
    let newResponseArray = newResponse.split(" ");

    newResponseArray.forEach((word, index) => delayPara(index, word + " "));
    setResultData(newResponse);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    loading,
    setLoading,
    onSent,
    resultData,
    setResultData,
    showResult,
    setShowResult,
    recentPrompt,
    setRecentPrompt,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
