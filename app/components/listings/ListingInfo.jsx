'use client'

import useCountries from "@/app/hooks/useCountrySelect"
import Avatar from "../Avatar"
import Maps from "../Maps"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"


const ListingInfo = ({category, listing}) => {

  const { getByValue } = useCountries();

  const coordinates = getByValue(listing.locationValue)?.latlng;

  const Maps = dynamic(() => import('../Maps'), {
    ssr: false
  })

  return (
    <section className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>

        <h2 className="text-xl font-bold flex items-center">
          Hosted by {listing.user?.name}
          <span className="ml-2">
            <Avatar src={listing.user?.image}/>
          </span>
        </h2>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <p>{listing.guestCount} guests</p>
          <p>{listing.roomCount} rooms</p>
          <p>{listing.bathroomCount} bathrooms</p>
        </div>
      </div>
      <hr/>
      {category && (
        <ListingCategory label={category.label} description={category.description} icon={category.icon} />
      )}
      <hr/>
      <p className="text-lg font-light text-neutral-500">{listing?.description}</p>
      <hr/>
      <Maps center={coordinates}/>
    </section>
  )
}

export default ListingInfo