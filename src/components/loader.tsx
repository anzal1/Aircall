import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export const Loader = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    //make a loader as the time passes
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1
        else return prev
      })
    }, 10)
    return () => clearInterval(interval)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}
