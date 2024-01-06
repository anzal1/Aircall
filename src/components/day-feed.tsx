import { parseDate } from "@/lib/dataModifier"
import { Call, GroupedCalls } from "@/types/call"
import CallCard from "./call-card"

// { date, calls }: { date: string; calls: Call[] }
const DayFeed = ({ groupedCalls }: { groupedCalls: GroupedCalls }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
      {Object.entries(groupedCalls).map(([key, calls]) => (
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold text-foreground/50 text-center">
            {parseDate(key)}{" "}
          </div>
          <div className="flex flex-col gap-2">
            {calls?.map((call: Call) => <CallCard call={call} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DayFeed
