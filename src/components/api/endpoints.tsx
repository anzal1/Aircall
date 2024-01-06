import { apiClient } from "@/lib/api-provider"

export const getFeed = (): Promise<unknown> =>
  apiClient(`/activities`, {
    method: "GET",
  })

export const archiveCall = (id: string): Promise<unknown> =>
  apiClient(`/activities/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_archived: true,
    }),
  })

export const getCallDetails = (id: string): Promise<unknown> =>
  apiClient(`/activities/${id}`, {
    method: "GET",
  })
