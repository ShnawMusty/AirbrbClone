import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

const listingPage = async({params}) => {
  const { listingId } = params;

  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params)
  
  if (!listing) {
    return (
      <EmptyState/>
    )
  };

  return (
    <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
  )
}


export default listingPage