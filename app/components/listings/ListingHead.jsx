'use client'

import useCountries from "@/app/hooks/useCountrySelect"
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

const ListingHead = ({title, id, imageSrc, locationValue, currentUser}) => {

  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
        <Image src={imageSrc} alt="Listing" fill className="object-cover" />
        <span className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </span>
      </div>
    </>
  )
}

export default ListingHead