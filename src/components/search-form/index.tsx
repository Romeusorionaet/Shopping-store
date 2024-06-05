'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Button } from '../ui/button'

export function SearchForm() {
  const [valueInput, setValueInput] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return
    }

    if (query !== `/search?q=${query}`) {
      router.push(`/search?q=${query}&p=1`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <form
        onSubmit={handleSearch}
        className="mx-auto flex w-full max-w-[600px] items-center gap-3 rounded-md border px-5 py-2 ring-zinc-700"
      >
        <Search size={32} className="text-base_color_white h-5 w-5" />

        <input
          type="text"
          defaultValue={query ?? ''}
          placeholder="Buscar produtos..."
          onChange={(e) => setValueInput(e.target.value)}
          name="q"
          required
          className="flex-1 bg-transparent text-sm outline-none"
        />

        <Button
          variant="secondary"
          type="submit"
          disabled={!valueInput}
          className="rounded-md p-1 text-base_color_text_top/80 duration-700 disabled:cursor-not-allowed disabled:bg-base_one_reference_header/40"
        >
          buscar
        </Button>
      </form>
    </motion.div>
  )
}
