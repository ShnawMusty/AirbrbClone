import { BiDollar } from "react-icons/bi"

const Input = ({id, label, type = 'text', disabled, required, register, errors, formatPrice}) => {

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="absolute top-5 left-2 text-neutral-700" />
      )}

      <input type={type} id={id} disabled={disabled} {...register(id, { required: required })} placeholder=" " className={`w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed peer
      ${formatPrice ? 'pl-9' : 'pl-4'}
      ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
      ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'} `}
      />

      <label className={`absolute top-5 ${formatPrice ? 'left-9' : 'left-4'} z-10 origin-[0] text-md transform -translate-y-3 duration-150
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4 `}>
        {label}
      </label>

    </div>
  )
}


export default Input