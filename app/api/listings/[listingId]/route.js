import getCurrentUser from "@/app/actions/getCurrentUser"
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}) {
  try {
    const { listingId } = params
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    if (!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid ID')
    }

    const deleteListing = await client.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id
      }
    })

    return NextResponse.json(deleteListing)

  } catch (error) {
    throw new Error('Failed to delete property')
  }
}