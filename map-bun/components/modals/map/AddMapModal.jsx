'use client'

import { useAddMapModal } from '@/hooks/use-modal'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { DrawerModal } from '@/components/ui/drawer-modal'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { convertXML } from 'simple-xml-to-json'
import { UploadButton, UploadDropzone } from '@/lib/uploadthing'

const baseURL = process.env.NEXT_PUBLIC_SITE_URL
const api = axios.create({
  baseURL,
})

export const AddMapModal = () => {
  const modal = useAddMapModal()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFileImage, setSelectedFileImage] = useState(null)
  const [lon, setLon] = useState(null)
  const [lat, setLat] = useState(null)
  const [name, setName] = useState(null)
  const [groundOverLayNorth, setGroundOverLayNorth] = useState(null)
  const [groundOverLaySouth, setGroundOverLaySouth] = useState(null)
  const [groundOverLayWest, setGroundOverLayWest] = useState(null)
  const [groundOverLayEast, setGroundOverLayEast] = useState(null)

  const save = async () => {
    setIsLoading(true)
    try {
      const payload = {
        lon,
        lat,
        name,
        ground_overlay_img: selectedFileImage,
        ground_overlay_north: groundOverLayNorth,
        ground_overlay_south: groundOverLaySouth,
        ground_overlay_west: groundOverLayWest,
        ground_overlay_east: groundOverLayEast,
      }

      await api.post('/api/map/create', payload)
      modal.onClose()

      toast.success('Success.')
    } catch (error) {
      console.error('Error while saving leave request:', error.message)
    } finally {
      setGroundOverLayNorth(null)
      setGroundOverLaySouth(null)
      setGroundOverLayEast(null)
      setGroundOverLayWest(null)
      setLat(null)
      setLon(null)
      setName(null)
      setSelectedFileImage(null)
      setIsLoading(false)
    }
  }

  const handleFileChange = async (e) => {
    const dataFileKML = e.target.files[0]
    const reader = new FileReader()
    reader.onload = async (event) => {
      const kmlString = event.target.result
      const myJson = convertXML(kmlString)

      const lastIndex = myJson.kml.children[0].Document.children.length - 1
      const coordinates =
        myJson.kml.children[0].Document.children[lastIndex].Placemark
          .children[2].Point.children[0].coordinates.content

      let groundOverlayObject = null

      const data = myJson.kml.children[0].Document.children
      data.forEach((element) => {
        if (element.GroundOverlay) {
          groundOverlayObject = element.GroundOverlay
        }
      })
      // console.log(groundOverlayObject)
      setGroundOverLayNorth(
        groundOverlayObject.children[4].LatLonBox.children[0].north.content
      )
      setGroundOverLaySouth(
        groundOverlayObject.children[4].LatLonBox.children[1].south.content
      )

      setGroundOverLayWest(
        groundOverlayObject.children[4].LatLonBox.children[3].west.content
      )
      setGroundOverLayEast(
        groundOverlayObject.children[4].LatLonBox.children[2].east.content
      )

      setLon(coordinates.split(',')[0])
      setLat(coordinates.split(',')[1])
      setName(
        myJson.kml.children[0].Document.children[6].Placemark.children[0].name
          .content
      )
    }
    reader.readAsText(dataFileKML)
  }

  useEffect(() => {
    if (modal.isOpen) {
    }
  }, [modal.isOpen])

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
          title={`Create Map`}
          description={`Create Map`}
        >
          <div className='mx-auto w-full h-[100%] text-xs space-y-2'>
            <div className='border p-4 rounded-md bg-white space-y-2'>
              <div className='grid w-full  items-center gap-1.5'>
                <Label htmlFor='picture'>.KML</Label>
                <Input id='kml' type='file' onChange={handleFileChange} />
              </div>

              <div className='grid w-full  items-center gap-1.5'>
                <Label htmlFor='picture'>Ground Overlay Image</Label>
                <UploadDropzone
                  className='w-full'
                  endpoint='imageUploader'
                  onClientUploadComplete={(res) => {
                    setSelectedFileImage(res[0].serverData.uri)
                    alert('Upload Completed')
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`)
                  }}
                />
              </div>

              <div className='border-t  border-gray-300 w-full'></div>
            </div>
            <div className='border p-4 rounded-md bg-white  flex items-center justify-end gap-1'>
              <Button
                className='text-right h-8'
                disabled={isLoading || !selectedFileImage || !lon}
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
