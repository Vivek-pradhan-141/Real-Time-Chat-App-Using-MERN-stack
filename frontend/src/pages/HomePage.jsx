import { useState } from "react";

import { useChatStore } from "../store/useChatStore.js"
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

function HomePage() {

  const {selectedUser} = useChatStore();
  const [sideHidden, setSideHidden] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-5xl h-[calc(100vh-9rem)]">
          <div className="flex h-full rounded-lg overflow-hidden ">
            <div className={`${selectedUser? "hidden": "block"} sm:block w-full  sm:w-72 `} sm:w-10>
              <Sidebar />
            </div>
            

            {!selectedUser?
            <div className={`${!selectedUser? "hidden": ""} sm:block m-auto`}><NoChatSelected /></div> 
            : <ChatContainer />}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
