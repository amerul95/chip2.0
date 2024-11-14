import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-slate-900">
      {/* <div className="relative">
      <Image
        src={"/radiation_1.png"}
        width={300}
        height={300}
        alt=""
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
       >
        </Image>
        <Image
          src={"/radiation_1.png"}
          width={300}
          height={300}
          alt=""
          className="relative inline-flex rounded-full ">
          

        </Image>
      </div> */}
      <Image 
      src={"/radiation_1.png"}
      width={300}
      height={300}
      alt=""
      className="animate-pulse"></Image>

      <Link href="/login" className="text-slate-900 text-5xl bg-white leading-normal mt-10 rounded-2xl font-semibold px-10 border-2 border-red-700 hover:text-white hover:bg-slate-600" >Login</Link>
    </div>
  )
}
