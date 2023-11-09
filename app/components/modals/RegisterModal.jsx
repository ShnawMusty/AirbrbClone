'use client'
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import useRegisterModalStore from '@/app/hooks/useRegisterModal';
import { useCallback, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModalStore from '@/app/hooks/useLoginModal';


const RegisterModal = () => {

  const [isLoading, setIsLoading] = useState(false);
  const useRegisterModal = useRegisterModalStore();
  const useLoginModal = useLoginModalStore();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    setIsLoading(true);

    await axios
    .post('/api/register', data)
    .then( () => {
      toast.success('User registered')
      useRegisterModal.onClose();
      useLoginModal.onOpen();
    } )
    .catch( (error) => toast.error(error.message) )
    .finally( () => setIsLoading(false) );
  };

  const toggle = useCallback(() => {
    useRegisterModal.onClose();
    useLoginModal.onOpen();
  }, [useRegisterModal, useLoginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title="Welcome to Airbnb" subtitle="Create an account!"/>
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" type='password' label="Password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr/>
      <Button label="Continue with Google" outline disabled={isLoading} icon={FcGoogle} onClick={() => signIn('google')} />

      <Button label="Continue with Github" outline disabled={isLoading} icon={AiFillGithub} onClick={() => signIn('github')} />

      <p className='text-center text-neutral-500 font-light mt-4'>Already have an account? <span className='text-neutral-800 cursor-pointer hover:underline font-semibold ml-2' onClick={toggle}>Log in</span>
      </p>
    </div>
  )

  return (
    <Modal
    title="Register"
    isOpen={useRegisterModal.isOpen}
    disabled={isLoading}
    actionLabel="Continue"
    onClose={useRegisterModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default RegisterModal