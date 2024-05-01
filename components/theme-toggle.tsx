'use client'
import { get, set } from 'tiny-cookie'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

type THEME = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<THEME>('light')
  const toggleTheme = useCallback(() => {
    const value: THEME = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(value)
    set('theme', value)
    setTheme(value)
  }, [theme])

  useEffect(() => {
    const currentTheme = (get('theme') as unknown as THEME) || 'dark'
    setTheme(currentTheme)
    // @ts-ignore react-hooks/exhaustive-deps
  }, [])

  return { toggleTheme, theme }
}

export default function ThemeToggleSwitch() {
  const { toggleTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size={'icon'}
      className="rounded-full dark:text-white"
      onClick={toggleTheme}
    >
      <MoonIcon className="block size-5 dark:hidden" />
      <SunIcon className="hidden size-5 dark:block" />
    </Button>
  )
}
