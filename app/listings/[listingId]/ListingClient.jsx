'use client'

import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'
import { categories } from '@/app/components/navbar/Categories'
import useLoginModalStore from '@/app/hooks/useLoginModal'
import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const ListingClient = ({listing, currentUser, reservations = []}) => {

  const category = useMemo(() => {
    return categories.find((item) => (
      item.label === listing.category
    ))
  }, [listing.category]);

  const useLoginModal = useLoginModalStore();
  const router = useRouter();
  
  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };

  const disabledDates = useMemo(() => {
    let dates = [];

    reservations.forEach((reserved) => {
      const range = eachDayOfInterval({
        start: new Date(reserved.startDate),
        end: new Date(reserved.endDate)
      });
      
      dates = [...dates, ...range];
    });
    
    return dates;
    
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return useLoginModal.onOpen();
    }

    setIsLoading(true);
    axios
    .post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
    })
    .then(() => {
      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      router.refresh();
      router.push('/trips');
    })
    .catch(() => {
      toast.error('Something went wrong')
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [totalPrice, dateRange, listing, currentUser, useLoginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

      if (listing.price && dayCount) {
        setTotalPrice(listing.price * dayCount)
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price])


  return (
    <Container>
      <section className='max-w-screen-lg mx-auto'>

        <div className='flex flex-col gap-6'>
          <ListingHead title={listing.title} imageSrc={listing.imageSrc} id={listing.id} locationValue={listing.locationValue} currentUser={currentUser} />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-7'>
            <ListingInfo category={category} listing={listing}/>

            <div className='order-first md:order-last md:col-span-3 mb-10'>
              <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value) => setDateRange(value)} dateRange={dateRange} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates}  />
            </div>

          </div>
        </div>

      </section>
    </Container>
  )
}

export default ListingClient