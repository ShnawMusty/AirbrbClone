import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req) {

  const currentUser = await getCurrentUser();

  if(!currentUser) return NextResponse.error();

  const body = await req.json();
  const { category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price,
      title,
      description } = body;

  const listing = await client.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      userId: currentUser.id
    },
  });

  return NextResponse.json(listing);
}
