import ClipLoader from 'react-spinners/ClipLoader'

export default function ControlLoading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <ClipLoader color="#fff" size={35} />
    </div>
  )
}
