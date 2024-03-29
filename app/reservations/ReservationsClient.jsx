'use client'

import React, { useCallback, useState } from 'react'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Container from '../components/Container'

const ReservationsClient = ({reservations, currentUser}) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleCancel = useCallback((id) => {
    setDeletingId(id)
    axios
    .delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled!');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong')
    })
    .finally(() => {
      setDeletingId('');
    })
    
  }, [router])

  return (
      <Container>
        <Heading title="Reservations" subtitle="Bookings on your properties" />
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
          {reservations.map((reservation) => (
            <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} actionLabel="Cancel guest reservation" onAction={handleCancel} disabled={deletingId === reservation.id} currentUser={currentUser}/>
          ))}
        </section>
      </Container>
  )
}

export default ReservationsClient