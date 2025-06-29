'use client'

import ChatInput from './ChatInput'
import MessageArea from './MessageArea'

const ChatArea = () => {
  return (
    <main className="bg-background relative flex h-full flex-grow flex-col sm:m-1.5 sm:rounded-xl">
      {/* Scrollbare Message-Area mit Platz für fixiertes Input */}
      <div className="flex flex-grow flex-col overflow-y-auto px-2 pb-[7rem] pl-[2.5rem] pt-2 sm:px-4 sm:pl-0">
        <MessageArea />
      </div>

      {/* Fixierter Input nur auf Mobile, sonst normal */}
      <div className="bg-background fixed bottom-0 left-0 right-0 z-30 px-5 pb-2 pt-2 sm:static sm:px-4 sm:pb-2">
        <ChatInput />
      </div>
    </main>
  )
}

export default ChatArea
