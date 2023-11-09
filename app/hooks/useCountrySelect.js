import countries from 'world-countries'


const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  region: country.region,
  latlng: country.latlng,
  flag: country.flag
}))


const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value) => {
    return formattedCountries.find((country) => country.value === value)
  };

  return {
    getAll, getByValue
  }
}

export default useCountries;