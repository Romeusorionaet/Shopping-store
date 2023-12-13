import ClipLoader from 'react-spinners/ClipLoader'

export default function AddressLoading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <ClipLoader color="#000" size={35} />
    </div>
  )
}
