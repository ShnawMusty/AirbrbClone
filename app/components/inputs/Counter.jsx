import { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = ({value, title, subtitle, onChange}) => {

 const onAdd = useCallback(() => {
    onChange(value + 1)
 }, [onChange, value]);

 const onReduce = useCallback(() => {
  if (value === 1) return;

  onChange(value - 1);

 }, [onChange, value])

  return (
    <section className='flex items-center justify-between'>

      <div className='flex flex-col items-start '>
        <h2 className='font-medium'>{title}</h2>
        <p className='font-light text-gray-600'>{subtitle}</p>
      </div>

      <div className='flex items-center gap-4'>
        <button onClick={onReduce} className="flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80">
          <AiOutlineMinus/>
        </button>
        <span className="font-light text-xl text-neutral-600">{value}</span>
        <button onClick={onAdd} className="flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80">
          <AiOutlinePlus/>
        </button>
      </div>
    </section>
  )
}

export default Counter