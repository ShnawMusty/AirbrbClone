'use client'

import Select from 'react-select'
import useCountries from '@/app/hooks/useCountrySelect'

const CountrySelect =({value, onChange}) => {

  const { getAll } = useCountries();

  return (
    <div>
      <Select
      placeholder='Anywhere'
      value={value}
      isClearable
      options={getAll()}
      onChange={(value) => onChange(value)}
      formatOptionLabel={(option) => (
        <div className='flex items-center gap-3'>
          <div>{option.flag}</div>
          <h2>{option.label},
            <span className='ml-1 text-neutral-500'>
              {option.region}
            </span>
          </h2>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg',
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6'
        }
      }) }
      />
    </div>
  )
}

export default CountrySelect