'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { TextArea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { usePlaygroundStore } from '@/store'
import useAIChatStreamHandler from '@/hooks/useAIStreamHandler'
import { useQueryState } from 'nuqs'
import Icon from '@/components/ui/icon'

const ChatInput = () => {
  const chatInputRef = useRef<HTMLTextAreaElement | null>(null)
  const { handleStreamResponse } = useAIChatStreamHandler()
  const [selectedAgent] = useQueryState('agent')
  const [inputMessage, setInputMessage] = useState('')
  const isStreaming = usePlaygroundStore((state) => state.isStreaming)

  const handleSubmit = async () => {
    if (!inputMessage.trim()) return
    const currentMessage = inputMessage
    setInputMessage('')

    try {
      await handleStreamResponse(currentMessage)
    } catch (error) {
      toast.error(
        `Error in handleSubmit: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }

  return (
    <div className="font-geist bg-background fixed bottom-0 left-0 right-0 z-50 flex w-full items-end justify-center gap-x-2 px-2 pb-3 pl-[2.5rem] pt-2 sm:static sm:mx-auto sm:mb-1 sm:max-w-2xl sm:px-4">
      <div className="flex w-full flex-nowrap items-end gap-x-2 gap-y-2">
        <TextArea
          placeholder="Deine Nachricht..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.nativeEvent.isComposing &&
              !e.shiftKey &&
              !isStreaming
            ) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          className="border-accent bg-primaryAccent text-primary focus:ring-accent w-full flex-grow resize-none rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-1"
          disabled={!selectedAgent}
          ref={chatInputRef}
        />
        <Button
          onClick={handleSubmit}
          disabled={!selectedAgent || !inputMessage.trim() || isStreaming}
          size="icon"
          className="bg-primary text-primaryAccent ml-0 rounded-xl p-4 sm:ml-2"
        >
          <Icon type="send" color="primaryAccent" />
        </Button>
      </div>
    </div>
  )
}

export default ChatInput
