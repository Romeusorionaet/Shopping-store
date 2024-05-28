import ClipLoader from 'react-spinners/ClipLoader'

export default function DetailsLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ClipLoader color="#000" size={35} />
    </div>
  )
}
