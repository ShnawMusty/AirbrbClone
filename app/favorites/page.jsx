import React from 'react'
import Container from '../components/Container'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
  
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!currentUser) {
    return (
      <EmptyState title='Unauthorized' subtitle="Please Login to see your favorites listing" />
    )
  }

  if (listings.length === 0) {
    return (
      <EmptyState title='No Favorites found' subtitle="Looks like you have no favorite listings yet." />
    )
  }

  return (
    <FavoritesClient listings={listings} currentUser={currentUser} />
  )
}

export default FavoritesPage