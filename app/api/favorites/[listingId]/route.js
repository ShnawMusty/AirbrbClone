import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req, {params}) {
  const currentUser = await getCurrentUser();

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(currentUser.favoriteIds || [] )];

  favoriteIds.push(listingId);

  const user = await client.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req, {params}) {
  const currentUser = await getCurrentUser();

  const {listingId} = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await client.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}