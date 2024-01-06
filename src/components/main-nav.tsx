import { PhoneCall } from "lucide-react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { activeTabState } from "./atoms/nav-state"
import { Button } from "./ui/button"

export const MainNav = () => {
  const setActiveTabState = useSetRecoilState(activeTabState)
  const activeTab = useRecoilValue(activeTabState)
  const handleTabChange = (activeTab: string) => {
    setActiveTabState(activeTab)
  }

  return (
    <div className="flex items-center gap-4 justify-start ">
      <PhoneCall
        className="h-6 w-6 text-green-400
        "
      />
      <span className="inline-block font-bold">Activity</span>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => handleTabChange("inbox")}
          variant={`${activeTab == "inbox" ? "default" : "outline"}`}
        >
          Inbox
        </Button>
        <Button
          onClick={() => handleTabChange("all")}
          variant={`${activeTab === "all" ? "default" : "outline"}`}
        >
          All Calls
        </Button>
      </div>
    </div>
  )
}
