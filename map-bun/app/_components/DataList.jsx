'use client'

import MapRestric from './MapRestric'

export default function DataList() {
  return (
    <div className='flex flex-col h-screen '>
      <div
        className='flex-1'
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        <MapRestric />
      </div>
    </div>
  )
}
