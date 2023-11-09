import React from 'react'

const ListingCategory = ({label, description, icon:Icon}) => {
  return (
    <section className='flex items-center gap-3'>
      <Icon size={40} className='text-neutral-700' />

      <div className='flex flex-col justify-center'>
        <h2 className='text-lg font-semibold'>{label}</h2>
        <p className='text-neutral-500 font-light' >{description}</p>
      </div>
    </section>
  )
}

export default ListingCategory