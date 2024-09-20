'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Button } from '../ui/button'

export function SearchForm() {
  const [valueInput, setValueInput] = useState('')

  const router = useRouter()

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    router.push(`/search?q=${valueInput}&p=1`)
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
        className="mx-auto flex w-full max-w-[600px] items-center gap-3 rounded-md border px-5 ring-zinc-700 md:py-2"
      >
        <Search size={32} className="text-base_color_white h-5 w-5" />

        <input
          type="text"
          value={valueInput}
          placeholder="Buscar produtos..."
          onChange={(e) => setValueInput(e.target.value)}
          name="q"
          required
          className="flex-1 bg-transparent outline-none max-md:text-sm"
        />

        <Button
          variant="secondary"
          type="submit"
          className="rounded-md bg-base_one_reference_header p-1 text-xs text-base_color_text_top/80 duration-700 max-md:-mr-5"
        >
          buscar
        </Button>
      </form>
    </motion.div>
  )
}
