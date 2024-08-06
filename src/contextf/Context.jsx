/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import run from "../config/grmini";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextword) => {
    setTimeout(function () {
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
    let responce;
    if (prompt !== undefined) {
      responce = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      responce = await run(input);
    }

    let responseArray = responce.split("**");
    let newResponce = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponce += responseArray[i];
      } else {
        newResponce += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponcetwo = newResponce.split("*").join("</br>");
    let newResponceArray = newResponcetwo.split(" ");
    for (let i = 0; i < newResponceArray.length; i++) {
      const nextword = newResponceArray[i];
      delayPara(i, nextword + " ");
    }
    setResultData(newResponcetwo);
    setLoading(false);
    setInput("");
  };
  const ContextValue = {
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
  return (
    <Context.Provider value={ContextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
