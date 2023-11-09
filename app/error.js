'use client'

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

const Error = ({error}) => {

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <EmptyState title="Uh Oh" subtitle="Something went wrong!" />
  )
}

export default Error;