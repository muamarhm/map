'use client'

import { Fragment, useEffect, useState } from 'react'
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
  Layer,
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useGetMapsAll } from '@/data/master'
import Image from 'next/image'
import GeocoderControlLonLat from './GeocoderControlLonLat'
import CustomCornerComponent from './CustomCornerComponent'
import { XIcon } from 'lucide-react'

const API_KEY = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const MapRestric = () => {
  const { data, error, isLoading } = useGetMapsAll()
  const [userLocation, setUserLocation] = useState(null)

  const [showPopup, setShowPopup] = useState(false)
  const [lonPopUp, setLonPopUp] = useState(null)
  const [latPopUp, setLatPopUp] = useState(null)
  const [detail, setDetail] = useState(null)

  const bounds = [
    [95.024414, -5.42319],
    [119.26758, 12.991934],
  ]
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          },
          (error) => {
            console.error('Error getting user location:', error)
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
    }

    getUserLocation()
  }, [])

  return (
    <Map
      mapboxAccessToken={API_KEY}
      initialViewState={{
        longitude: userLocation?.longitude,
        latitude: userLocation?.latitude,
        zoom: 5,
      }}
      style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
      maxBounds={bounds}
    >
      {!isLoading &&
        data?.success.map((state, index) => {
          const isActive = state.status == 1

          return (
            <Fragment key={index}>
              <Source
                id={`my-data-${state.id}`}
                type='image'
                coordinates={[
                  [
                    parseFloat(state.ground_overlay_west),
                    parseFloat(state.ground_overlay_north),
                  ],
                  [
                    parseFloat(state.ground_overlay_east),
                    parseFloat(state.ground_overlay_north),
                  ],
                  [
                    parseFloat(state.ground_overlay_east),
                    parseFloat(state.ground_overlay_south),
                  ],
                  [
                    parseFloat(state.ground_overlay_west),
                    parseFloat(state.ground_overlay_south),
                  ],
                ]}
                url={`/map-webp/${state.ground_overlay_img_local}`}
              >
                <Layer
                  id={`overlay-${state.id}`}
                  type='raster'
                  paint={{
                    'raster-color': isActive ? '#FFA500' : '#ff0000',
                    'raster-opacity': 0.2,
                  }}
                />
              </Source>
              <Marker
                longitude={state.lon}
                latitude={state.lat}
                onClick={() => {
                  setShowPopup(true)
                  setLonPopUp(state.lon)
                  setLatPopUp(state.lat)
                  setDetail(state.name)
                }}
              >
                {isActive ? (
                  <Image
                    src='/map-icon/active.png'
                    width={14}
                    height={14}
                    alt='Active'
                  />
                ) : (
                  <Image
                    src='/map-icon/notActive.png'
                    width={14}
                    height={14}
                    alt='Active'
                    className='animate-ping'
                  />
                )}
              </Marker>
            </Fragment>
          )
        })}

      {userLocation && (
        <Marker
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
          onClick={() => {
            setShowPopup(true)
            setLonPopUp(userLocation.longitude)
            setLatPopUp(userLocation.latitude)
            setDetail('Your Location Here')
          }}
        >
          <div style={{ color: 'red', cursor: 'pointer' }}>📍</div>
        </Marker>
      )}
      {showPopup && (
        <Popup
          className='rounded-lg shadow-lg'
          longitude={lonPopUp}
          latitude={latPopUp}
          onClose={() => setShowPopup(false)}
          closeOnClick={false}
          anchor='top'
          closeButton={false}
        >
          <div className='w-full text-xs'>
            <div className='flex justify-between'>
              <div></div>
              <button onClick={() => setShowPopup(false)}>
                <XIcon className='h-3 w-3' />
              </button>
            </div>
            <div>{detail}</div>
          </div>
        </Popup>
      )}
      <GeocoderControlLonLat mapboxAccessToken={API_KEY} position='top-left' />
      <FullscreenControl />
      <GeolocateControl />
      <NavigationControl />
      <ScaleControl />
      <CustomCornerComponent />
    </Map>
  )
}

export default MapRestric
