'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/')
  }

  return (
    <div onClick={handleClick}>
      <Image src="/images/logo.png" alt="logo" width={100} height={100} className="hidden md:block cursor-pointer"/>
    </div>
  )
}

export default Logo