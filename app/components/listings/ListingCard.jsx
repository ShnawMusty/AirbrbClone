'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import useCountries from "@/app/hooks/useCountrySelect"
import HeartButton from "../HeartButton"
import { format } from "date-fns"
import { useCallback, useMemo } from "react"
import Button from "../Button"

const ListingCard = ({data, currentUser, reservation, disabled, onAction, actionLabel, actionId = ""}) => {

  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const reservationDate = () => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')} `;
  };

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    };

    return data.price;
  }, [data.price, reservation]);

  const handleCancel = useCallback((e) => {
    e.stopPropagation();
    if (disabled) return;

    onAction?.(actionId)
  }, [disabled, onAction, actionId])

  return (
    <article onClick={() => router.push(`/listings/${data.id}`)} className="cols-span-1 cursor-pointer group">

    <section className="flex flex-col gap-2 w-full">

      <div className="relative w-full aspect-square rounded-xl overflow-hidden">
        <Image src={data.imageSrc} alt="Listing" className="w-full h-full object-cover group-hover:scale-110 transition" fill />

        <span className="absolute top-3 right-3" >
          <HeartButton listingId={data.id} currentUser={currentUser} />
        </span>
      </div>

      <h2 className="font-semibold text-lg">{location?.region}, {location?.label}</h2>

      <p className="font-light text-neutral-500">
        {reservationDate() || data.category}
      </p>
      <div className="flex gap-1 items-center">
        <span className="font-semibold">$ {price}</span>
        <p className="font-light">
          {!reservation && (<span>night</span>)}
        </p>
      </div>
      {onAction && actionLabel  && (
        <Button label={actionLabel} onClick={handleCancel} disabled={disabled} small/>
      )}
    </section>
    </article>
  )
}

export default ListingCard