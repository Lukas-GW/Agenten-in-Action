'use client'

import { useEffect } from 'react'
import { usePlaygroundStore } from '@/store'

export function ClientWrapper() {
  // useEffect(() => {
  //   const endpoint =
  //     process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:7777'
  //   console.log('🔁 Setting endpoint to:', endpoint)
  //   usePlaygroundStore.getState().setSelectedEndpoint(endpoint)
  // }, [])
  useEffect(() => {
    const endpoint =
      process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://agent-ki-backend.fly.dev'
    console.log('🔁 Setting endpoint to:', endpoint)

    fetch(`${endpoint}/v1/playground/status`)
      .then((res) => res.text())
      .then((data) => console.log('✅ Backend reachable:', data))
      .catch((err) => console.error('❌ Backend unreachable:', err))

    usePlaygroundStore.getState().setSelectedEndpoint(endpoint)
  }, [])

  return null
}
