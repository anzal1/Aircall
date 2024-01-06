import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { durationConvertor, parseDateAndTime } from "@/lib/dataModifier"
import { Call } from "@/types/call"
import {
  ArchiveIcon,
  Loader,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
} from "lucide-react"
import { useState } from "react"
import { useArchiveCallMutation, useGetCallDetailsQuery } from "./api"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { useToast } from "./ui/use-toast"

const CallCard = ({ call }: { call: Call }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useGetCallDetailsQuery(call.id)
  const { mutate: archiveCallFn, isLoading: isArchiving } =
    useArchiveCallMutation()
  const handleArchive = (callId: string) => {
    archiveCallFn(callId, {
      onSuccess: () => {
        //trigger a refetch
        toast({
          title: "Call Archived",
          description: "Call has been archived successfully",
        })
        window.location.reload()
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Cannot archive call!",
          variant: "destructive",
        })
      },
    })
  }

  if (isLoading) {
    return (
      <Skeleton className="w-[350px]">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <span className="flex gap-4 items-start ">
              <span className="w-28">
                <Skeleton />
              </span>
            </span>
            <div>
              <Skeleton />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-foreground/70">
            <Skeleton />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Skeleton>
    )
  }

  return (
    <Card
      className="w-[350px] cursor-pointer"
      onClick={() => {
        if (isArchiving) return
        setOpen(true)
      }}
    >
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Call Details</DrawerTitle>
            <DrawerDescription>
              Same as individual call object.
            </DrawerDescription>
            <code className="text-foreground/70">
              {JSON.stringify(data, null, 2)}
            </code>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          {call.call_type === "missed" ? (
            <span className="flex gap-4 items-start ">
              <PhoneMissed className="h-6 w-6 text-red-400" />
              {call.direction === "inbound" ? call.from : call.to}
            </span>
          ) : call.direction === "inbound" ? (
            <span className="flex gap-4 items-start ">
              <PhoneIncoming className="h-6 w-6 text-green-400" />
              {call.from}
            </span>
          ) : (
            <span className="flex gap-4 items-start ">
              <PhoneOutgoing className="h-6 w-6 text-blue-400" />
              {call.to}
            </span>
          )}

          <div>{parseDateAndTime(call.created_at)}</div>
        </div>
      </CardHeader>
      <CardContent>
        {call.direction !== "inbound" ? (
          <div className="text-foreground/70">To: {call.to}</div>
        ) : (
          <div className="text-foreground/70">
            Incoming Call From: {call.from}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div>Duration : {durationConvertor(call.duration)}</div>
          <div>
            {isArchiving ? (
              <div className="animate-spin">
                <Loader className="h-3 w-3" />
              </div>
            ) : (
              <Button
                onClick={() => {
                  handleArchive(call.id)
                }}
                variant={"outline"}
                size={"sm"}
              >
                <ArchiveIcon className="h-3 w-3" />
                Archive
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CallCard
