import Image from 'next/image'
import React from 'react'

const CustomCornerComponent = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className='w-36 '>
        <p className='font-bold'>Transmitter</p>
        <div className='flex gap-2'>
          <Image
            src='/map-icon/active.png'
            width={14}
            height={14}
            alt='Normal'
          />
          <div> = </div>
          <div className='font-bold'>Normal</div>
        </div>
        <div className='flex gap-2'>
          <Image
            src='/map-icon/notActive.png'
            width={14}
            height={14}
            alt='Affected'
          />
          <div> = </div>
          <div className='font-bold'>Affected</div>
        </div>
      </div>
    </div>
  )
}

export default CustomCornerComponent
