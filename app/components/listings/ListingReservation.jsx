'use client'

import Button from "../Button"
import Calendar from "../inputs/Calendar"

const ListingReservation = ({price, totalPrice, onChangeDate, dateRange, onSubmit, disabledDates, disabled}) => {
  return (
    <section className="bg-white border-[1px] border-neutral-200 rounded-xl overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <h2 className="text-2xl font-semibold">$ {price}</h2>
        <p className="font-light text-neutral-600">night</p>
      </div>
      <hr/>
      <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)}  />
      <hr/>
      <div className="p-4">
        <Button label="Reserve" disabled={disabled} onClick={onSubmit}/>
      </div>
      <div className="flex items-center justify-between font-semibold text-lg p-4">
        <h2>Total</h2>
        <h2>$ {totalPrice}</h2>
      </div>
    </section>
  )
}

export default ListingReservation