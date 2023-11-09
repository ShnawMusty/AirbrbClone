import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'

const FavoritesClient = ({currentUser, listings}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favourited!" />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {listings.map((listing) => (
          <ListingCard key={listing.id} currentUser={currentUser} data={listing}  />
        ))}
      </section>
    </Container>
  )
}

export default FavoritesClient