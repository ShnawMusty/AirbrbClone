'use client'
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import toast from 'react-hot-toast';

import useRegisterModalStore from '@/app/hooks/useRegisterModal';
import useLoginModalStore from '@/app/hooks/useLoginModal';


const LoginModal = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const useRegisterModal = useRegisterModalStore();
  const useLoginModal = useLoginModalStore();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if(callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        useLoginModal.onClose();
      };

      if(callback?.error) {
        toast.error(callback.error)
      };
    })
  };

  const toggle = useCallback( () => {
    useLoginModal.onClose();
    useRegisterModal.onOpen();
  }, [useLoginModal, useRegisterModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title="Welcome back" subtitle="Login to your account!"/>

      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
  
      <Input id="password" type='password' label="Password" disabled={isLoading} register={register} errors={errors} required />

    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr/>
      <Button label="Continue with Google" outline disabled={isLoading} icon={FcGoogle} onClick={() => signIn('google')} />

      <Button label="Continue with Github" outline disabled={isLoading} icon={AiFillGithub} onClick={() => signIn('github')} />

      <p className='text-center text-neutral-500 font-light mt-4'>First time using Airbnb? <span className='text-neutral-800 cursor-pointer hover:underline font-semibold ml-2' onClick={toggle}>Register now!</span>
      </p>
    </div>
  )

  return (
    <Modal
    title="Login"
    isOpen={useLoginModal.isOpen}
    disabled={isLoading}
    actionLabel="Continue"
    onClose={useLoginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModal