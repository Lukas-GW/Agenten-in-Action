'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import Icon from '@/components/ui/icon'
import { IconType } from '@/components/ui/icon/types'
import React, { useState } from 'react'

const EXTERNAL_LINKS = {
  documentation: 'https://agno.link/agent-ui',
  playground: 'https://app.agno.com/playground/agents',
  agno: 'https://agno.com'
}

const TECH_ICONS = [
  {
    type: 'nextjs' as IconType,
    position: 'left-0',
    link: 'https://nextjs.org',
    name: 'Next.js',
    zIndex: 10
  },
  {
    type: 'shadcn' as IconType,
    position: 'left-[15px]',
    link: 'https://ui.shadcn.com',
    name: 'shadcn/ui',
    zIndex: 20
  },
  {
    type: 'tailwind' as IconType,
    position: 'left-[30px]',
    link: 'https://tailwindcss.com',
    name: 'Tailwind CSS',
    zIndex: 30
  }
]

interface ActionButtonProps {
  href: string
  variant?: 'primary'
  text: React.ReactNode
}

const ActionButton = ({ href, variant, text }: ActionButtonProps) => {
  const baseStyles =
    'px-4 py-2 text-sm transition-colors font-dmmono tracking-tight'
  const variantStyles = {
    primary: 'border border-border hover:bg-neutral-800 rounded-xl'
  }

  return (
    <Link
      href={href}
      target="_blank"
      className={`${baseStyles} ${variant ? variantStyles[variant] : ''}`}
    >
      {text}
    </Link>
  )
}

const ChatBlankState = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  // Animation variants for the icon
  const iconVariants: Variants = {
    initial: { y: 0 },
    hover: {
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 10,
        mass: 0.5
      }
    },
    exit: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        mass: 0.6
      }
    }
  }

  // Animation variants for the tooltip
  const tooltipVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section
      className="font-geist flex flex-col items-center text-center"
      aria-label="Welcome message"
    >
      <div className="flex max-w-3xl flex-col gap-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-[600] tracking-tight"
        >
          <div className="flex items-center justify-center gap-x-2 whitespace-nowrap font-medium">
            <div className="flex w-full flex-col">
              <span className="break-words">
                Dies ist ein Beispiel für zwei KI Agenten
              </span>
              <span className="break-words">
                eine{' '}
                <span className="font-bold text-fuchsia-400">Reise KI</span> und
                eine
                <span className="font-bold text-cyan-400"> Finanz KI</span>
              </span>
            </div>
          </div>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          <ActionButton
            href={'https://www.linkedin.com/in/lukas-gro%C3%9Fe-westermann/'}
            variant="primary"
            text="LinkedIn"
          />
          <ActionButton
            href={'https://github.com/Lukas-GW?tab=repositories'}
            variant="primary"
            text={
              <span className="flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                    fill="currentColor"
                  />
                </svg>
                Source Code
              </span>
            }
          />
        </motion.div>
      </div>
    </section>
  )
}

export default ChatBlankState
