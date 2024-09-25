import { BellNotification } from '@/components/notification/bell-notification'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, Menu, RefreshCcw } from 'lucide-react'

export default function HeaderAdmin() {
  const profile = { username: 'Romeu soares', picture: '' }
  return (
    <header>
      <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-2 p-10 md:justify-around">
        <div className="flex items-center gap-6">
          <RefreshCcw size={30} className="opacity-50" />

          <div className="rounded-lg bg-base_one_reference_header p-2 max-md:hidden">
            <h1 className="whitespace-nowrap text-2xl font-bold text-base_color_text_top">
              S.S <span className="font-thin uppercase">adm</span>
            </h1>
          </div>
        </div>

        <div className="flex items-end gap-4">
          <Avatar>
            <AvatarFallback>{profile.username}</AvatarFallback>

            {profile.picture && <AvatarImage src={`${profile.picture}`} />}
          </Avatar>
          <p className="font-medium max-md:hidden">{profile.username}</p>
        </div>

        <div className="flex items-center gap-6 md:gap-10">
          <Mail size={30} />
          <BellNotification sizeNotification={1} username={profile.username} />
          <Menu />
        </div>
      </div>
    </header>
  )
}
