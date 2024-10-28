import React, { useRef, useState, useEffect } from 'react'

interface ModalProps {
  showModal: boolean
  onClose: () => void
  onClick: () => void
}

import dir from '~/public/dir.svg'
import regenerate from '~/public/regenerate.svg'
import insert from '~/public/insert.svg'

const Modal: React.FC<ModalProps> = ({ showModal, onClose, onClick }) => {
  const modalContainerRef = useRef(null)
  const modalRef = useRef(null)
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [showResponse, setShowResponse] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleModal = (e: React.MouseEvent) => {
    if (modalContainerRef.current === e.target) {
      onClose()
    } else if (modalRef.current === e.target) {
      e.stopPropagation()
    }
  }

  const handleMessages = () => {
    if (msg) {
      setMessages((prev) => [...prev, msg])
    }
    setMsg('')
  }

  if (!showModal) return null

  return (
    <div
      ref={modalContainerRef}
      onClick={handleModal}
      className='modal-wrapper fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[999] bg-black bg-opacity-50'
    >
      <div
        ref={modalRef}
        className='flex flex-col gap-4 bg-white p-4 py-12 rounded-lg w-[80%] max-w-[500px] text-center shadow-lg'
      >
        {messages.length > 0 &&
          messages.map((message, index) => (
            <p
              key={index}
              className='w-[60%] self-end flex items-center bg-[#DFE1E7] text-[#666D80] p-4 text-[16px] rounded-lg'
            >
              {message}
            </p>
          ))}
        {showResponse && (
          <p className='w-[80%] self-start flex items-center bg-[#DBEAFE] text-[#666D80] p-4 text-[16px] rounded-lg'>
            Thank you for the opportunity! If you have any more questions or if
            there's anything else I can help you with, feel free to ask.
          </p>
        )}
        <input
          placeholder='Your Prompt'
          className='outline-none border border-gray-300 rounded-md w-full p-2'
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        {isGenerated ? (
          <div className='flex gap-4 items-center'>
            <button
              onClick={() => {
                onClick()
                onClose()
              }}
              className='flex justify-center items-center bg-white border border-[#666D80] text-gray-500 gap-4 w-fit px-8 h-[36px] rounded-lg text-[16px] font-semibold self-end'
            >
              <img src={insert} className='h-[16px] w-[16px]' />
              Insert
            </button>
            <button className='flex justify-center items-center bg-[#3B82F6] text-white gap-4 w-fit px-8 h-[36px] rounded-lg text-[16px] font-semibold self-end'>
              <img src={regenerate} className='h-[20px] w-[20px]' />
              Regenerate
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              if (msg) {
                handleMessages()
                setShowResponse(true)
                setIsGenerated(true)
              }
            }}
            className='flex justify-center items-center bg-[#3B82F6] text-white gap-4 w-fit px-8 h-[36px] rounded-lg text-[16px] font-semibold self-end'
          >
            <img src={dir} className='h-[20px] w-[20px]' />
            Generate
          </button>
        )}
      </div>
    </div>
  )
}

export default Modal
