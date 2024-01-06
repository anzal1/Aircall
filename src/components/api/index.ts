import { useMutation, useQuery } from "@tanstack/react-query"
import * as ENDPOINTS from "./endpoints"

export const QUERY_KEYS = {
  getFeed: "getFeed",
  archiveCall: "archiveCall",
  getCallDetails: "getCallDetails",
}

export const useGetFeedQuery = () => {
  return useQuery([QUERY_KEYS.getFeed], ENDPOINTS.getFeed)
}

export const useArchiveCallMutation = () => {
  return useMutation([QUERY_KEYS.archiveCall], ENDPOINTS.archiveCall)
}

export const useGetCallDetailsQuery = (callId: string) => {
  return useQuery([QUERY_KEYS.getCallDetails], () =>
    ENDPOINTS.getCallDetails(callId),
  )
}
