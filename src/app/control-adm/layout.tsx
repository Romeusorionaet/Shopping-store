import { getDataUser } from '@/lib/getData/get-data.user'

interface Props {
  children: React.ReactNode
}

export default async function layoutAdm({ children }: Props) {
  const { props } = await getDataUser()
  const isAdm = props?.isAdm

  if (!isAdm) {
    return null
  }

  return (
    <div className="bg-slate-950 text-white pt-28 min-h-screen">{children}</div>
  )
}
