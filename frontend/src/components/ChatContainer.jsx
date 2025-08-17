import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js"
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./skeleons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import formatTime from "../lib/formatTime.js";
import { useState } from "react";

const ChatContainer = () => {

  const { messages, getMessages, isMessageLoading, selectedUser, subscribeToMessage, unsubscribeToMessage} = useChatStore();
  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);



  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessage();

    return ()=>unsubscribeToMessage();
  }, [selectedUser._id, getMessages,subscribeToMessage,subscribeToMessage]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto ">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 flex flex-col overflow-auto p-4 space-y-4 ">
        {messages.map((message) => (
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full ">
                <img src={message.senderId === authUser._id ? (authUser.profilePic || "/avatar.svg") : (selectedUser.profilePic || "/avatar.svg")} alt="profilePic" />
              </div>
            </div>
            <div className="chat-footer mb-1 ">
              <time className="text-[11px] sm:text-sm opacity-70 ml-1">
                {formatTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col  w-fit max-w-[70%] md:max-w-[50%] ">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && (
                <p className="text-[10px] sm:text-sm break-words whitespace-pre-wrap  ">
                  {message.text}
                </p>
              )}

            </div>

          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput />

    </div>
  )
}

export default ChatContainer
