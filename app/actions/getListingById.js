import client from "../libs/prismadb";


export default async function getListingById(listingId) {
  try {
    const listing = await client.listing.findUnique({
      where: {
        id: listingId
      },
      include: {
        user: true
      }
    });

    if (!listing) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null
      }
    }

  } catch (error) {
    throw new Error(error);
  }
}