import useSWRMutation from 'swr/mutation'
import useSWR, { Key, SWRConfiguration } from 'swr'
import http from './http'

export const swrConfig = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: process.env.NODE_ENV !== 'development',
}

type GetKey<T> = [string, T]

export const HttpPost =
  <Arg, ResData>() =>
  (url: string, { arg }: { arg: Arg }) => {
    return http.post<any, ResData>(url, arg)
  }

export const HttpPut =
  <Arg, ResData>() =>
  (url: string, { arg }: { arg: Arg }) => {
    return http.put<any, ResData>(url, arg)
  }

export const HttpGet = <Arg, ResData>(params: GetKey<Arg>) => {
  return http.get<any, ResData>(params[0], { params: params[1] })
}

export const HttpDelete =
  <Arg, ResData>() =>
  (url: string, { arg }: { arg: Arg }) => {
    return http.delete<any, ResData>(url, {
      data: arg,
    })
  }

export const useSWRPost = <Arg, ResData = any>(key: string) =>
  useSWRMutation<ResData, any, string, Arg>(key, HttpPost<Arg, ResData>())

export const useSWRPut = <Arg, ResData = any>(key: string) =>
  useSWRMutation<ResData, any, string, Arg>(key, HttpPut<Arg, ResData>())

export const useSWRDelete = <Arg, ResData = any>(key: string) =>
  useSWRMutation<ResData, any, string, Arg>(key, HttpDelete<Arg, ResData>())

export const useSWRGet = <ResData, Arg = any>(key: GetKey<Arg> | Key, customConfig?: SWRConfiguration) => {
  if ((key as GetKey<Arg>)?.length === 2) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSWR<ResData, any, GetKey<Arg>>(key as GetKey<Arg>, HttpGet, customConfig)
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSWR<ResData, any>(key, http.get, customConfig)
}
