import { atom } from "recoil"

export const activeTabState = atom({
  key: "activeTabState",
  default: "inbox" as string,
})
