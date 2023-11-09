'use client'
import useCountries from '@/app/hooks/useCountrySelect';
import useSearchModalStore from '@/app/hooks/useSearchModal'
import { differenceInCalendarDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {BiSearch} from 'react-icons/bi'

const Search = () => {

  const useSearchModal = useSearchModalStore();
  const params = useSearchParams();

  const { getByValue } = useCountries();

  const locationValue = params.get('locationValue');
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');
  const guestCount = params.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label;
    }

    return 'Anywhere'
  }, [locationValue, getByValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      let diff = differenceInCalendarDays(end, start);

      if (diff === 0) {
        diff = 1
      }
      return diff == 1 ? `${diff} Day` : `${diff} Days`;
    };

    return 'Any week'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return guestCount == 1 ? `${guestCount} Guest` : `${guestCount} Guests`
    };

    return 'Guests'
  }, [guestCount]);

  return (
    <section onClick={useSearchModal.onOpen} className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-sm font-semibold px-6'>{locationLabel}</p>

        <p className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>{durationLabel}</p>

        <div className='flex flex-row items-center gap-3 text-m pl-6 pr-2 text-gray-600'>
          <p className='hidden sm:block'>{guestLabel}</p>
          <span className='p-2 bg-rose-500 rounded-full text-white'>
            <BiSearch size={18}/>
          </span>
        </div>

      </div>
    </section>
  )
}

export default Search