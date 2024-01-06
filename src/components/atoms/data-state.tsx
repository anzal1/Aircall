import { GroupedCalls } from "@/types/call"
import { atom } from "recoil"

export const dataState = atom({
  key: "data",
  default: {
    groupedIncomingCalls: {} as GroupedCalls,
    groupedArchivedCalls: {} as GroupedCalls,
    groupedAllCalls: {} as GroupedCalls,
  },
})
