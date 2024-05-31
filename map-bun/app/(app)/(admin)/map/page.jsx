import React from 'react'
import DataList from './_components/DataList'

export default function page() {
  return (
    <main className='flex flex-1 flex-col gap-4 p-2 lg:gap-6 lg:p-6'>
      <div className=' rounded-lg shadow-sm  space-y-2'>
        <DataList />
      </div>
    </main>
  )
}
