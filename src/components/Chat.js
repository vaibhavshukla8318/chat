import React, { useState, useEffect, useRef } from 'react';
import Picker, { Emoji, SkinTones } from "emoji-picker-react";
import chatStyle from '../css/chat.module.css';
import Navbar from './Navbar';

// List of user names
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [latestUser, setLatestUser] = useState("");

  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
const userListRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Scroll to the bottom of the chat container when messages change
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

useEffect(() => {
  document.addEventListener("click", handleClickOutside);
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);

const handleClickOutside = (e) => {
  if (userListRef.current && !userListRef.current.contains(e.target)) {
    setShowUserList(false);
  }
};

  
 // Function to send a message
  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = {
        user: randomUser,
        text: inputText.trim(),
        likes: 0
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setLatestUser(randomUser); 
      inputRef.current.focus();
    }
  };


 // Function to handle like button click
  const handleLike = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes += 1;
    setMessages(updatedMessages);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setShowUserList(e.target.value.includes('@')); // Show user list when '@' is typed
  };

//Function to handle mention
  const handleMention = (username) => {
    setInputText(prevText => prevText + `${username} `);
    setShowUserList(false);
  };

 // Function to handle emoji click
  const handleEmojiClick = (emojiData, event) => {
    const { unified } = emojiData;
    const emoji = String.fromCodePoint(`0x${unified}`);

    setInputText(inputText + emoji);
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
    {/* latestUser in Navbar */}
      <Navbar latestUser={latestUser} />

      <div className={chatStyle.chats} >
        <div className={chatStyle.userChat}  ref={chatContainerRef}>
         
            {messages.map((message, index) => (
              <div key={index} className={chatStyle.message}>
                <div>
                  <span className={chatStyle.userName}>{message.user}: </span>
                  <span className={chatStyle.text}>{message.text}</span>
                </div>
                <div>
                  <button onClick={() => handleLike(index)}>Like</button>
                  <span className={chatStyle.likes}>{message.likes}</span>
                </div>
              </div>
            ))}  
        </div>

        <div className={chatStyle.input}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            ref={inputRef}
            placeholder="Type your message..."
          />
          {selectedEmoji ? (
            <Emoji
              emoji={selectedEmoji}
              size={22}
              native={true}
              onClick={handleEmojiClick}
            />
          ) : null}
          {showEmojiPicker && (
            <Picker
              className={chatStyle.EmojiPickerReact}
              onEmojiClick={handleEmojiClick}
              disableAutoFocus={true}
              groupNames={{ smileys_people: "PEOPLE" }}
              native={true}
              SkinTone={SkinTones.NONE}
            />
          )}

            {/* Button to toggle emoji picker */}
          <button
            className={chatStyle.emojiButton}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <div
              className={
                chatStyle.showEmojiPicker
                  ? "fa-solid fa-face-smile"
                  : "fa-regular fa-face-smile"
              }
            ></div>
          </button>
          <button className={chatStyle.sendButton} onClick={sendMessage}><i class="fas fa-paper-plane"></i></button>
         
        {/* Render user list when '@' is typed */}
            {showUserList && (
              <div className={chatStyle.userList} ref={userListRef} >
                {user_list.map((user, index) => (
                  <div key={index} className={chatStyle.user} onClick={() => handleMention(user)}>
                    {user}
                  </div>
                ))}
              </div>
            )}
         
        </div>
      </div>
    </>
  );
};

export default ChatApp;
