'use client'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModalStore from '@/app/hooks/useRegisterModal'
import useLoginModalStore from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import useRentModalStore from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'

const UserMenu = ({currentUser}) => {

  const useRegisterModal = useRegisterModalStore();
  const useLoginModal = useLoginModalStore();
  const useRentModal = useRentModalStore();

  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const onRent = useCallback(() => {

    if(!currentUser) return useLoginModal.onOpen();

    useRentModal.onOpen()
  }, [currentUser, useLoginModal, useRentModal])
  
  return (
    <section className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <h4 onClick={onRent} className='hidden md:block text-sm font-semibold rounded-full py-3 px-4 hover:bg-neutral-100 transition cursor-pointer' >Airbnb your home</h4>

        <h4 onClick={toggleOpen} className="flex items-center gap-3 p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full cursor-pointer transition hover:shadow-md" >
          <AiOutlineMenu/>

          <span className='hidden md:block'>
          <Avatar src={currentUser?.image} />
          </span>
        </h4>
      </div>

      {isOpen && (
        <section className='absolute top-12 right-0 w-[40vw] md:w-3/4 overflow-hidden text-sm bg-white rounded-xl shadow-md'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem label="My trips" onClick={() => router.push('/trips')} />

                <MenuItem label="My favorites" onClick={() => router.push('/favorites')} />

                <MenuItem label="My reservations" onClick={() => router.push('/reservations')} />

                <MenuItem label="My properties" onClick={() => router.push('/properties')} />

                <MenuItem label="Airbnb my home" onClick={useRentModal.onOpen} />
                <hr/>
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
            <>
              <MenuItem label="Login" onClick={useLoginModal.onOpen} />

              <MenuItem label="Sign up" onClick={useRegisterModal.onOpen} />
            </>
            )}

          </div>
        </section>
      )}
    </section>
  )
}

export default UserMenu

