'use client'

const CategoryInput = ({label, icon: Icon, selected, onClick}) => {
  return (
    <section onClick={() => onClick(label)} className={`flex flex-col gap-3 border-2 rounded-xl p-4 hover:border-black transition cursor-pointer
    ${selected ? 'border-black' : 'border-neutral-200'} `}>
      <Icon size={30} />
      <h3 className="font-semibold">{label}</h3>
    </section>
  )
}

export default CategoryInput


const ran = (label) => {
  setCustomValue('category', label)
}