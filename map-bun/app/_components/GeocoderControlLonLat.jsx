'use client'
import React, { useState } from 'react'
import { useControl, Marker, Popup } from 'react-map-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { XIcon } from 'lucide-react'

export default function GeocoderControlLonLat(props) {
  const {
    marker = true,
    onLoading = () => {},
    onResults = () => {},
    onResult = () => {},
    onError = () => {},
    ...otherProps
  } = props

  const [markerComponent, setMarkerComponent] = useState(null)
  const [popupInfo, setPopupInfo] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const coordinatesGeocoder = function (query) {
    const matches = query.match(
      /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
    )
    if (!matches) {
      return null
    }

    function coordinateFeature(lng, lat) {
      return {
        center: [lng, lat],
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        place_name: 'Lat: ' + lat + ' Lng: ' + lng,
        place_type: ['coordinate'],
        properties: {},
        type: 'Feature',
      }
    }

    const coord1 = Number(matches[1])
    const coord2 = Number(matches[2])
    const geocodes = []

    if (coord1 < -90 || coord1 > 90) {
      geocodes.push(coordinateFeature(coord1, coord2))
    }

    if (coord2 < -90 || coord2 > 90) {
      geocodes.push(coordinateFeature(coord2, coord1))
    }

    if (geocodes.length === 0) {
      geocodes.push(coordinateFeature(coord1, coord2))
      geocodes.push(coordinateFeature(coord2, coord1))
    }

    return geocodes
  }

  const geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        ...otherProps,
        marker: false,
        accessToken: otherProps.mapboxAccessToken,
        placeholder: 'Try: Place or Lon, Lat',
        countries: 'my',
        localGeocoder: coordinatesGeocoder,
        reverseGeocode: true,
      })
      ctrl.on('loading', onLoading)
      ctrl.on('results', onResults)
      ctrl.on('result', (evt) => {
        const { result } = evt
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === 'Point' && result.geometry.coordinates))

        if (location) {
          // Send only longitude and latitude to onResult callback
          onResult({
            longitude: location[0],
            latitude: location[1],
          })
        }

        if (location && marker) {
          setMarkerComponent(
            <Marker
              {...otherProps.marker}
              longitude={location[0]}
              latitude={location[1]}
              onClick={() => setShowPopup(true)}
            />
          )
          setPopupInfo({
            longitude: location[0],
            latitude: location[1],
            place_name: result.place_name || 'Selected Location',
          })
          setShowPopup(true)
        } else {
          setMarkerComponent(null)
          setPopupInfo(null)
        }
      })
      ctrl.on('error', onError)
      return ctrl
    },
    {
      position: otherProps.position,
    }
  )

  // Private member check and property updates
  if (geocoder._map) {
    if (
      geocoder.getProximity() !== otherProps.proximity &&
      otherProps.proximity !== undefined
    ) {
      geocoder.setProximity(otherProps.proximity)
    }
    if (
      geocoder.getRenderFunction() !== otherProps.render &&
      otherProps.render !== undefined
    ) {
      geocoder.setRenderFunction(otherProps.render)
    }
    if (
      geocoder.getLanguage() !== otherProps.language &&
      otherProps.language !== undefined
    ) {
      geocoder.setLanguage(otherProps.language)
    }
    if (
      geocoder.getZoom() !== otherProps.zoom &&
      otherProps.zoom !== undefined
    ) {
      geocoder.setZoom(otherProps.zoom)
    }
    if (
      geocoder.getFlyTo() !== otherProps.flyTo &&
      otherProps.flyTo !== undefined
    ) {
      geocoder.setFlyTo(otherProps.flyTo)
    }
    if (
      geocoder.getPlaceholder() !== otherProps.placeholder &&
      otherProps.placeholder !== undefined
    ) {
      geocoder.setPlaceholder(otherProps.placeholder)
    }
    if (
      geocoder.getCountries() !== otherProps.countries &&
      otherProps.countries !== undefined
    ) {
      geocoder.setCountries(otherProps.countries)
    }
    if (
      geocoder.getTypes() !== otherProps.types &&
      otherProps.types !== undefined
    ) {
      geocoder.setTypes(otherProps.types)
    }
    if (
      geocoder.getMinLength() !== otherProps.minLength &&
      otherProps.minLength !== undefined
    ) {
      geocoder.setMinLength(otherProps.minLength)
    }
    if (
      geocoder.getLimit() !== otherProps.limit &&
      otherProps.limit !== undefined
    ) {
      geocoder.setLimit(otherProps.limit)
    }
    if (
      geocoder.getFilter() !== otherProps.filter &&
      otherProps.filter !== undefined
    ) {
      geocoder.setFilter(otherProps.filter)
    }
    if (
      geocoder.getOrigin() !== otherProps.origin &&
      otherProps.origin !== undefined
    ) {
      geocoder.setOrigin(otherProps.origin)
    }
  }

  return (
    <>
      {markerComponent}
      {popupInfo && showPopup && (
        <Popup
          className='rounded-lg shadow-lg'
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          anchor='top'
          onClose={() => setShowPopup(false)}
          closeButton={false}
        >
          <button
            className='absolute top-2 right-2 p-2  z-10 focus:outline-none'
            onClick={() => setShowPopup(false)}
          >
            <XIcon className='h-3 w-3' />
          </button>
          <div className='w-full text-xs'>
            <div className=' border-b-2 pt-2 pb-2'>
              <div className='font-bold'>Location</div>
              <div>{popupInfo.place_name}</div>
            </div>
            <div className='flex flex-col gap-2 '>
              <div className='border-b-2 pt-2 pb-2'>
                <div className=''>
                  <p className='font-bold text-orange-500'>OREN</p>
                  <p className='capitalize'>kawasan liputan siaran DTT</p>
                </div>

                <div className=''>
                  <p className='font-bold text-red-500'>MERAH</p>
                  <p className='capitalize'>kawasan gangguan perkhidmatan</p>
                </div>
              </div>
              <div className='pt-2 pb-2 text-pretty '>
                <div>
                  *Sekiranya anda berada di luar kawasan liputan DTT, anda perlu
                  memasang sistem DTH Satelit Piring MYTV.
                </div>
                <div>
                  Hubungi{' '}
                  <a
                    className='font-bold text-blue-500 hover:underline'
                    href='tel:+1300806988'
                  >
                    1300 80 6988
                  </a>{' '}
                  untuk bantuan.
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  )
}
