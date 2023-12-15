import ClipLoader from 'react-spinners/ClipLoader'

export default function ControlLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ClipLoader color="#fff" size={35} />
    </div>
  )
}
