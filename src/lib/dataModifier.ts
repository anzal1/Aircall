import { Call, GroupedCalls } from "@/types/call"

export const sortCallGroups = (group: GroupedCalls) => {
  return Object.fromEntries(
    Object.entries(group).sort((a, b) => {
      return new Date(b[0]).getTime() - new Date(a[0]).getTime()
    }),
  )
}
export const sortCallsInsideGroup = (group: GroupedCalls) => {
  Object.keys(group).forEach((key) => {
    group[key].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  })
}

export const groupCallsBy = (data: Call[]) => {
  //sanitize all empty calls

  data = data.filter((call: Call) => {
    return Object.keys(call).length === 9
  })

  let groupedIncomingCalls: GroupedCalls = {}
  let groupedArchivedCalls: GroupedCalls = {}
  let groupedAllCalls: GroupedCalls = {}
  // group calls by date using the created_at key the calls inside the groupedCalls object should be sorted according to the created_at key and in descending order and the calls inside each  date should be sorted according to the created_at key and in descending order and also group all calls

  data.forEach((call) => {
    const date = call.created_at.split("T")[0]
    if (call.is_archived) {
      if (groupedArchivedCalls[date]) {
        groupedArchivedCalls[date].push(call)
      } else {
        groupedArchivedCalls[date] = [call]
      }
    } else {
      if (call.direction === "inbound") {
        if (groupedIncomingCalls[date]) {
          groupedIncomingCalls[date].push(call)
        } else {
          groupedIncomingCalls[date] = [call]
        }
      }
    }
    if (groupedAllCalls[date]) {
      groupedAllCalls[date].push(call)
    } else {
      groupedAllCalls[date] = [call]
    }
  })

  groupedAllCalls = sortCallGroups(groupedAllCalls)
  groupedIncomingCalls = sortCallGroups(groupedIncomingCalls)
  groupedArchivedCalls = sortCallGroups(groupedArchivedCalls)

  sortCallsInsideGroup(groupedAllCalls)
  sortCallsInsideGroup(groupedArchivedCalls)
  sortCallsInsideGroup(groupedIncomingCalls)

  return {
    groupedIncomingCalls,
    groupedArchivedCalls,
    groupedAllCalls,
  }
}

export const parseDate = (date: string) => {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString("default", { month: "long" })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  return `${month} ${day}, ${year}`
}

export const parseDateAndTime = (date: string) => {
  return new Date(date)
    .toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
    .split(",")[1]
}

export const durationConvertor = (duration: number) => {
  // if exceeds 60 minutes convert to minutes and if minutes exceeds 60 convert to hours
  if (duration > 3600) {
    return `${Math.floor(duration / 3600)}h ${Math.floor(
      (duration % 3600) / 60,
    )}m ${duration % 60}s`
  } else if (duration > 60) {
    return `${Math.floor(duration / 60)}m ${duration % 60}s`
  } else {
    return `${duration}s`
  }
}
