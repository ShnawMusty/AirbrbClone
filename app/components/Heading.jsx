
const Heading = ({title, subtitle, center}) => {
  return (
    <div className={`${center ? 'text-center' : 'text-start'} flex flex-col `}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-neutral-500 font-md">{subtitle}</p>
    </div>
  )
}

export default Heading