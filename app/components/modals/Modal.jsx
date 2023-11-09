'use client'

import { useCallback, useEffect, useState } from "react";
import {IoMdClose} from 'react-icons/io'
import Button from "../Button";

const Modal = ({title, body, footer, disabled, actionLabel, secondaryActionLabel, secondaryAction, isOpen, onClose, onSubmit}) => {

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    setTimeout(async () => {
      await onClose();
    }, 300)

  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();

  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();

  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <main className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-hidden outline-none focus:outline-none bg-neutral-800/70">

        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full md:h-auto lg:h-auto my-6 mx-auto">
          {/* CONTENT */}
          <article className={`h-full translate duration-300
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'} `}>

            <section className="relative flex flex-col h-full md:h-auto lg:h-auto bg-white outline-none focus:outline-none border-0 rounded-lg shadow-lg">
              {/* HEADER */}
              <h1 className="relative flex items-center justify-center p-6 border-b-[1px] rounded-t" >
                <button onClick={handleClose} className="absolute left-9 p-1 border-0 hover:opacity-70">
                  <IoMdClose size={18}/>
                </button>
                <span className="text-lg font-semibold">
                  {title}
                </span>
              </h1>

              {/* BODY */}
              <div className="relative p-6 flex-auto">
                {body}
              </div>

              {/* FOOTER */}
              <div className="flex flex-col  gap-2 p-6 ">
                <span className="flex items-center gap-4 w-full">

                  {secondaryAction && secondaryActionLabel && (
                    <Button outline disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction}/>
                  )}

                  <Button disabled={disabled} label={actionLabel} onClick={handleSubmit}/>

                </span>
                {footer}
              </div>
            </section>
          </article>
        </div>

      </main>
    </>
  )
}

export default Modal