'use client'

import { useRouter, useSearchParams } from "next/navigation";
import queryString from 'query-string'
import { useCallback } from "react";

const CategoryBox = ({label, icon: Icon, selected}) => {

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString())
    }

    const updatedQuery = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url = queryString.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, {skipNull: true});

    router.push(url);

  }, [label, params, router])

  return (
    <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}` }>
      <Icon size={26} />
      <h2 className='text-sm font-medium'>{label}</h2>
    </div>
  )
}

export default CategoryBox