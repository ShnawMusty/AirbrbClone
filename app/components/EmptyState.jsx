'use client'

import { useRouter } from "next/navigation"
import Button from "./Button"
import Heading from "./Heading"

const EmptyState = ({title = "No exact matches", subtitle = "Try changing or removing some of your filters", showReset}) => {

  const router = useRouter();

  return (
    <section className="h-[60vh] flex flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />

      {showReset && (
      <div className="w-48 mt-4">
      <Button outline label="Remove all filters" onClick={() => router.push('/')} />
      </div> 
      )}
    </section>
  )
}

export default EmptyState