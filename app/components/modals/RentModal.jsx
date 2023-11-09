'use client'

import useRentModalStore from "@/app/hooks/useRentModal"
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const STEPS = {
  category: 0,
  location: 1,
  info: 2,
  images: 3,
  description: 4,
  price: 5
}

const RentModal = () => {

  const useRentModal = useRentModalStore();
  const [step, setStep] = useState(STEPS.category);
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const watchSelectedCategory = watch('category');
  const watchSelectedLocation = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const router = useRouter();

  const Maps = useMemo(() => dynamic(() => import('../Maps'), {
    ssr: false
  }), [watchSelectedLocation])
  
  const setCustomValue = (name, value) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  };
  
  const onNext = () => {
    setStep((value) => value + 1)
  };

  const onSubmit = (data) => {
    if (step !== STEPS.price) {
      return onNext();
    }

    setIsLoading(true);

    axios
    .post('api/listings', data)
    .then(() => {
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.category);

      useRentModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong');
      useRentModal.onClose();
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.price) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.category) {
      return undefined
    };

    return 'Back'
  }, [step]);

  let bodyContent = (
    <section className="flex flex-col gap-8">
      <Heading
      title="Which of these best describes your place?"
      subtitle="Pick a category"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">

        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput 
            onClick={(category) => setCustomValue('category', category)}
            selected={watchSelectedCategory === item.label} 
            label={item.label} 
            icon={item.icon} />
          </div>
        ))}
      </div>
    </section>
  )

  if (step === STEPS.location)  {
    bodyContent = (
      <section className="flex flex-col gap-8">

        <Heading title="Where is your property located?" subtitle="Help guest find you" />
        
        <CountrySelect value={watchSelectedLocation} onChange={(value) => setCustomValue('location', value)}/>
        <Maps center={watchSelectedLocation?.latlng}/>
      </section>
    )
  };

  if (step === STEPS.info) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading title="Share some basics about your place" subtitle="What amenities do you have?"/>
        <Counter title='Guests' subtitle='How many guests do you allow?' value={guestCount} onChange={(value) => setCustomValue('guestCount', value)} />
        <hr/>
        <Counter title='Rooms' subtitle='How many rooms do you have?' value={roomCount} onChange={(value) => setCustomValue('roomCount', value)} />
        <hr/>
        <Counter title='Bathrooms' subtitle='How many bathrooms do you have?' value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)} />
      </section>
    )
  };

  if (step === STEPS.images) {
    bodyContent = (
      <section>
        <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!" /> 
        <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
      </section>
    )
  };

  if (step === STEPS.description) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading title="How would you describe your place?" subtitle="Short and sweet works best!" /> 
        <Input label="Title" id="title" disabled={isLoading} required register={register} errors={errors}/>
        <hr/>
        <Input label="Description" id="description" disabled={isLoading} required register={register} errors={errors}/>
      </section>
    )
  };

  if (step === STEPS.price) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading title="Set your price" subtitle="How much do you charge per night?"/>
        <Input label="Price" id="price" type="number" formatPrice required register={register} errors={errors} disabled={isLoading}/>
      </section>
    )
  }

  return (
    <Modal
    title="Airbnb your home!"
    onClose={useRentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    isOpen={useRentModal.isOpen}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.category ? undefined : onBack}
    body={bodyContent}
    />
  )
}

export default RentModal