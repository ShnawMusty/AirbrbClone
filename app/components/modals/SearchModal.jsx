'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Modal from "./Modal"
import useSearchModalStore from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import queryString from "query-string";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

const SearchModal = () => {

  const STEPS = {
    location: 0,
    date: 1,
    info: 2
  }

  const router = useRouter();
  const params = useSearchParams();
  const useSearchModal = useSearchModalStore();

  const [location, setLocation] = useState();
  const [step, setStep] = useState(STEPS.location);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Maps = useMemo( () => dynamic(
    () => import('../Maps'), {ssr: false} )
  ,[location])

  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [step]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [step]);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.info) {
      return onNext();
    }
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery, 
      locationValue: location?.value,
      roomCount,
      bathroomCount,
      guestCount
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    };

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    };

    const url = queryString.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    setStep(STEPS.location);
    useSearchModal.onClose();
    router.push(url);

  }, [router, step, location, roomCount, guestCount, bathroomCount, params, dateRange]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.info) {
      return 'Search'
    } 
    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.location) {
      return undefined
    } 
    return 'Back'
  }, [step]);

  let bodyContent = (
    <section className="flex flex-col gap-8">
      <Heading title="Where do you wanna go?" subtitle="Find the perfect location!"/>
      <CountrySelect value={location} onChange={(value) => setLocation(value)} />
      <hr/>
      <Maps center={location?.latlng} />
    </section>
  );

  if (step == STEPS.date) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
        <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
      </section>
    )
  }

  if (step === STEPS.info) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter title="Guests" subtitle="How many guests are coming?" value={guestCount} onChange={(value) => setGuestCount(value)}/>
        
        <Counter title="Rooms" subtitle="How many rooms do you need?" value={roomCount} onChange={(value) => setRoomCount(value)}/>

        <Counter title="Bathrooms" subtitle="How many bathrooms do you need?" value={bathroomCount} onChange={(value) => setBathroomCount(value)}/>
  
      </section>
    )
  }

  return (
    <Modal
    title="Filters"
    actionLabel={actionLabel}
    onSubmit={onSubmit}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.location ? undefined : onBack}
    onClose={useSearchModal.onClose}
    isOpen={useSearchModal.isOpen}
    body={bodyContent}
    />
  )
}


export default SearchModal