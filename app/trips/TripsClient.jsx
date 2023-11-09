'use client'

import { useRouter } from 'next/navigation'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import { useCallback, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const TripsClient = ({reservations, currentUser}) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('')
  
  const onCancel = useCallback((id) => {
    setDeletingId(id)
    axios
    .delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation Cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('')
    })
  }, [router])

  return (
    <Container>
      <Heading title='Trips' subtitle="Where you've been and where you're going" />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id} 
            reservation={reservation}
            currentUser={currentUser}
            data={reservation.listing}
            disabled={reservation.id === deletingId}
            actionId={reservation.id}
            actionLabel="Cancel reservation"
            onAction={onCancel} />
        ))}
      </section>
    </Container>
  )
}

export default TripsClient