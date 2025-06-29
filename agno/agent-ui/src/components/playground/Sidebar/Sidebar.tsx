'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { AgentSelector } from '@/components/playground/Sidebar/AgentSelector'
import useChatActions from '@/hooks/useChatActions'
import { usePlaygroundStore } from '@/store'
import { Skeleton } from '@/components/ui/skeleton'
import { useQueryState } from 'nuqs'
import { getProviderIcon } from '@/lib/modelProvider'

const SidebarHeader = () => (
  <div className="flex items-center gap-2 px-1">
    <span className="text-xs font-semibold uppercase tracking-wide text-white">
      Agenten&nbsp;in&nbsp;Action
    </span>
  </div>
)

const NewChatButton = ({
  disabled,
  onClick
}: {
  disabled: boolean
  onClick: () => void
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    size="lg"
    className="bg-primary text-background hover:bg-primary/80 h-9 w-full rounded-xl text-xs font-medium"
  >
    <Icon type="plus-icon" size="xs" className="text-background" />
    <span className="uppercase">Neuer&nbsp;Chat</span>
  </Button>
)

const ModelDisplay = ({ model }: { model: string }) => (
  <div className="border-primary/15 bg-accent text-muted flex h-9 w-full items-center gap-2 rounded-xl border px-3 text-xs font-medium uppercase">
    {(() => {
      const icon = getProviderIcon(model)
      return icon ? <Icon type={icon} size="xs" className="shrink-0" /> : null
    })()}
    {model}
  </div>
)

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const { clearChat, focusChatInput, initializePlayground } = useChatActions()
  const {
    messages,
    selectedEndpoint,
    isEndpointActive,
    selectedModel,
    hydrated,
    isEndpointLoading
  } = usePlaygroundStore()

  const [agentId] = useQueryState('agent')

  useEffect(() => {
    if (hydrated) initializePlayground()

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [hydrated, initializePlayground])

  const handleNewChat = () => {
    clearChat()
    focusChatInput()
  }

  const sidebarWidth = isCollapsed ? '2.5rem' : '16rem'

  return (
    <>
      {/* Overlay nur auf Mobile sichtbar */}
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <motion.aside
        className={`${
          isMobile ? 'fixed z-40' : 'relative'
        } bg-background left-0 top-0 flex h-full flex-col px-2 py-3 transition-all`}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.08, ease: 'easeInOut' }}
      >
        {/* Toggle-Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-primary/10 absolute left-2 top-2 z-50 rounded-md p-1"
        >
          <Icon
            type="sheet"
            size="xs"
            className={`transform transition-transform ${
              isCollapsed ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              key="sidebar-content"
              className="mt-10 flex w-full flex-col gap-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <SidebarHeader />

              <NewChatButton
                disabled={messages.length === 0}
                onClick={handleNewChat}
              />

              {isEndpointActive && (
                <div className="flex flex-col gap-2">
                  <span className="text-primary text-xs font-medium uppercase">
                    Agent
                  </span>

                  {isEndpointLoading ? (
                    <div className="flex flex-col gap-2">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-9 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <AgentSelector />
                      {selectedModel && agentId && (
                        <ModelDisplay model={selectedModel} />
                      )}
                    </>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  )
}

export default Sidebar
