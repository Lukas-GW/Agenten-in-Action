'use client'

import Sidebar from '@/components/playground/Sidebar/Sidebar'
import { ChatArea } from '@/components/playground/ChatArea'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-background flex h-screen flex-row">
        <Sidebar />
        <div className="flex h-full flex-grow flex-col overflow-hidden">
          <ChatArea />
        </div>
      </div>
    </Suspense>
  )
}
