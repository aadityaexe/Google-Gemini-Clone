/* eslint-disable react/jsx-key */
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../contextf/Context";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const handleOnMenuClick = () => {
    setExtended(!extended);
  };
  const loardPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <img src={assets.menu_icon} alt="" onClick={handleOnMenuClick}></img>
          <div onClick={() => newChat} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended ? <p>New Chat</p> : null}
          </div>
          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item) => {
                return (
                  <div
                    onClick={() => loardPrompt(item)}
                    className="recent-entry"
                  >
                    <img src={assets.message_icon} alt="" />
                    {extended ? <p>{item.slice(0, 18)}...</p> : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bootom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bootom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bootom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
