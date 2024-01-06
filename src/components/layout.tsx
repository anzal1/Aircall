import { Call } from "@/types/call"
import { ReactNode, useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { groupCallsBy } from "../lib/dataModifier"
import { useGetFeedQuery } from "./api"
import { dataState } from "./atoms/data-state"
import { Loader } from "./loader"

const Layout = ({ children }: { children: ReactNode }) => {
  // fetch the data and set it to the recoil state

  const { data, isLoading, isError } = useGetFeedQuery()

  // set the data to the recoil state
  const setData = useSetRecoilState(dataState)

  useEffect(() => {
    if (data) {
      setData(groupCallsBy(data as Call[]))
    }
  }, [data])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loader />
      </div>
    )
  }

  if (isError) {
    return <div>Error...</div>
  }

  return (
    <div className="flex max-w-7xl mx-auto items-center justify-center">
      {children}
    </div>
  )
}

export default Layout
