import getCurrentUser from './actions/getCurrentUser';
import getListings from './actions/getListings'
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';
import styles from './globals.css'

const Home = async ({searchParams}) => {
  const listings = await getListings(searchParams);

  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <Container>
        <EmptyState showReset/>
      </Container>
    )
  }
  
  return (
    <Container>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pt-24">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
        ))}
      </section>
    </Container>
  );
}

export default Home;