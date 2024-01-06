import { ArchiveIcon } from "lucide-react"
import { useRecoilValue } from "recoil"
import { dataState } from "./atoms/data-state"
import { activeTabState } from "./atoms/nav-state"
import DayFeed from "./day-feed"
import { Card, CardHeader } from "./ui/card"

export const Home = () => {
  const { groupedIncomingCalls, groupedAllCalls, groupedArchivedCalls } =
    useRecoilValue(dataState)
  const activeTab = useRecoilValue(activeTabState)

  const handleArchiveAll = () => {
    //TODO: no api endpoint for this
  }

  return (
    <div className="mt-10">
      <Card className="w-[350px] my-4" onClick={handleArchiveAll}>
        <CardHeader>
          <span className="flex gap-2 items-start justify-start ">
            <ArchiveIcon className="h-6 w-6" />
            <h1 className="text-xl font-semi-bold">Archive All Calls</h1>
          </span>
        </CardHeader>
      </Card>
      {activeTab === "all" ? (
        <DayFeed groupedCalls={groupedAllCalls} />
      ) : activeTab === "inbox" ? (
        <DayFeed groupedCalls={groupedIncomingCalls} />
      ) : (
        <DayFeed groupedCalls={groupedArchivedCalls} />
      )}
    </div>
  )
}
