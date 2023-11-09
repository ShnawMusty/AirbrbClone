import client from "../libs/prismadb"

export default async function getListings(params) {
  try {
    const { userId, category, roomCount, bathroomCount, guestCount, locationValue, startDate, endDate } = params; 

    let query = {};

    if (userId) query.userId = userId;

    if (category) query.category = category;

    if (locationValue) query.locationValue = locationValue

    if (roomCount) query.roomCount = {
      gte: +roomCount
    };

    if (bathroomCount) query.bathroomCount = {
      gte: +bathroomCount
    };

    if (guestCount) query.guestCount = {
      gte: +guestCount
    };

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: { lte: startDate },
                endDate: { gte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    
    const getListings = await client.listing.findMany({
      where: query, 
      orderBy: {
        createdAt: 'desc'
      }
    })

    const listings = getListings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))

    return listings;
    
  } catch (error) {
    throw new Error('Something went wrong')
  }
}