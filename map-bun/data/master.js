import { fetchMaps, fetchMapsAll, fetchMapsAlls } from '@/server/master'
import { useQuery } from '@tanstack/react-query'

export function useGetMap(filter, page, perPage) {
  return useQuery({
    queryFn: async () => fetchMaps(filter, page, perPage),
    queryKey: ['maps', filter, page, perPage],
    staleTime: 1 * 1000,
    refetchInterval: 1 * 1000,
  })
}

export function useGetMaps() {
  return useQuery({
    queryFn: async () => fetchMapsAll(),
    queryKey: ['mapsAll'],
  })
}

export function useGetMapsAll() {
  return useQuery({
    queryFn: async () => fetchMapsAlls(),
    queryKey: ['mapsAlls'],
    staleTime: 3 * 1000,
    refetchInterval: 3 * 1000,
  })
}
