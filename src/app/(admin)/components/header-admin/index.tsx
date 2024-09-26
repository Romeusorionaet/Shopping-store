'use client'

import { BellNotification } from '@/components/notification/bell-notification'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, RefreshCcw } from 'lucide-react'

export default function HeaderAdmin() {
  const profile = { username: 'Romeu soares', picture: '' }

  return (
    <header className="fixed h-24 w-full bg-slate-100">
      <div className="flex w-full items-center justify-between gap-2 p-4 md:justify-around">
        <div className="mt-2 flex items-center justify-center rounded-full bg-base_one_reference_header p-1 text-base_color_text_top max-md:ml-16 md:gap-4 md:rounded-lg">
          <Avatar>
            <AvatarFallback>{profile.username}</AvatarFallback>

            {profile.picture && <AvatarImage src={`${profile.picture}`} />}
          </Avatar>
          <div>
            <h1 className="whitespace-nowrap font-bold max-md:hidden">
              S.S <span className="font-thin uppercase">adm</span>
            </h1>
            <p className="font-medium max-md:hidden">{profile.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-10">
          <Mail className="h-6 w-6 md:h-8 md:w-8" />
          <BellNotification sizeNotification={1} username={profile.username} />
          <RefreshCcw size={30} className="h-6 w-6 opacity-50 md:h-8 md:w-8" />
        </div>
      </div>
    </header>
  )
}
