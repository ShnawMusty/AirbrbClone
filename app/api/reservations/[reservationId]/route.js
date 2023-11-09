import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req, {params}) {
  const currentUser = await getCurrentUser();
  const { reservationId } = params;

  if (!currentUser) return NextResponse.error();

  if (!reservationId || typeof reservationId !== 'string') throw new Error('Invalid ID')
  try {
    const deleteReservation = await client.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          {userId: currentUser.id},
          {listing: {userId: currentUser.id} }
        ]
      }
    })

    return NextResponse.json(deleteReservation);

  } catch (error) {
    throw new Error('Failed to cancel reservation')
  }
}