'use client'
import React, { useState } from 'react'
import { useControl, Marker } from 'react-map-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default function GeocoderControl(props) {
  const {
    marker = true,
    onLoading = () => {},
    onResults = () => {},
    onResult = () => {},
    onError = () => {},
    ...otherProps
  } = props

  const [markerComponent, setMarkerComponent] = useState(null)

  const geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        ...otherProps,
        marker: false,
        accessToken: otherProps.mapboxAccessToken,
        countries: 'my',
      })
      ctrl.on('loading', onLoading)
      ctrl.on('results', onResults)
      ctrl.on('result', (evt) => {
        onResult(evt)

        const { result } = evt
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === 'Point' && result.geometry.coordinates))
        if (location && marker) {
          setMarkerComponent(
            <Marker
              {...otherProps.marker}
              longitude={location[0]}
              latitude={location[1]}
            />
          )
        } else {
          setMarkerComponent(null)
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

  return markerComponent
}
