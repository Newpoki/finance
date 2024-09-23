"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

type OverviewBalancesTooltipProps = {
  title: string
}

export const OverviewBalancesTooltip = ({
  title,
}: OverviewBalancesTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
