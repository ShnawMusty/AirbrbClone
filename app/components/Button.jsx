'use client'

const Button = ({label, disabled, outline, small, icon: Icon, onClick}) => {
  return (
    <button disabled={disabled} onClick={onClick} className={ `relative w-full disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition
    ${outline ? 'bg-white' : 'bg-rose-500'}
    ${outline ? 'border-black' : 'border-rose-500'}
    ${outline ? 'text-black' : 'text-white'}
    ${small ? 'py-1' : 'py-3'}
    ${small ? 'text-sm' : 'text-md'}
    ${small ? 'font-light' : 'font-semibold'}
    ${small ? 'border-[1px]' : 'border-2'} `} 
    >
      {Icon && (
        <Icon size={24} className='absolute top-3 left-4'  />
      )}
      {label}
    </button>
  )
}

export default Button