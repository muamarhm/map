'use client'

import { useChangeStatusModal } from '@/hooks/use-modal'
import { useEffect, useState } from 'react'
import { format, subDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import SelectSearch from '@/components/ui/select-search'
import { DrawerModal } from '@/components/ui/drawer-modal'

const baseURL = process.env.NEXT_PUBLIC_SITE_URL
const api = axios.create({
  baseURL,
})

const statueses = [
  {
    id: 1,
    name: 'active',
    label: 'active',
    value: 1,
  },
  {
    id: 0,
    name: 'not active',
    label: 'not active',
    value: 0,
  },
]

export const ChangeStatusModal = () => {
  const modal = useChangeStatusModal()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)

  const handleChange = (value) => {
    setSelectedStatus(value)
  }
  const save = async () => {
    setIsLoading(true)
    try {
      const payload = {
        status: selectedStatus,
        id: modal.data.id,
      }
      // console.log(payload)
      await api.post('/api/map/change-status', payload)
      modal.onClose()
      toast.success('Success.')
    } catch (error) {
      console.error('Error while saving leave request:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (modal.isOpen && modal.data) {
      setSelectedStatus(modal.data.status)
    }
  }, [modal.isOpen, modal.data])

  useEffect(() => {
    if (!modal.isOpen) {
      setIsLoading(false)
    }
  }, [modal.isOpen])

  if (modal.isOpen)
    return (
      <div>
        <DrawerModal
          isOpen={modal.isOpen}
          onClose={modal.onClose}
          title={`Are you sure ?`}
          description={`change status`}
        >
          <div className='mx-auto w-full h-[100%] text-xs space-y-2'>
            <div className='border p-4 rounded-md bg-white space-y-2'>
              <div className='flex  justify-between items-center '>
                <div>
                  <div>Nama</div>
                  <div className='font-bold text-gray-600'>
                    {modal.data.name}
                  </div>
                  <div className='font-bold text-gray-600'></div>
                </div>

                <div>
                  <div>
                    <div>Status</div>
                    <div className={`font-bold capitalize text-blue-500`}>
                      {/* {modal.data.status} */}
                      {modal.data.status == 1 ? 'Active' : 'Not Active'}
                    </div>
                  </div>
                </div>
                <div>
                  <div>Longitude</div>
                  <div className='font-bold text-gray-600'>
                    {modal.data.lon}
                  </div>
                  <div className='font-bold text-gray-600'></div>
                </div>

                <div>
                  <div>
                    <div>Latitude</div>
                    <div className={`font-bold capitalize `}>
                      {/* {modal.data.status} */}
                      {modal.data.lat}
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-t  border-gray-300 w-full'></div>
            </div>
            <div className='border p-4 rounded-md bg-white  flex items-center justify-center gap-1'>
              <SelectSearch
                className='w-full h-8'
                items={statueses}
                value={selectedStatus}
                onSelect={handleChange}
                heading='Select Status'
              />
              <Button
                className='text-right h-8'
                disabled={isLoading}
                onClick={save}
              >
                Save
              </Button>
            </div>
          </div>
        </DrawerModal>
      </div>
    )
}
