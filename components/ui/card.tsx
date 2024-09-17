"use client"

import { cn } from "@/lib/utils"
import { Paper, PaperProps } from "./paper"
import { createContext, useContext } from "react"

type CardContextData = {
  inverted: boolean
}

const CardContext = createContext<CardContextData>({
  inverted: false,
})

type CardProps = PaperProps & { inverted?: boolean }

export const Card = ({ className, inverted = false, ...others }: CardProps) => {
  return (
    <CardContext.Provider value={{ inverted }}>
      <Paper
        {...others}
        className={cn("flex flex-col gap-3 p-5 md:p-6", className, {
          "bg-foreground": inverted,
        })}
      />
    </CardContext.Provider>
  )
}

type CardTitleProps = React.DetailsHTMLAttributes<HTMLHeadingElement>

export const CardTitle = ({ className, ...others }: CardTitleProps) => {
  const { inverted } = useContext(CardContext)

  return (
    <h2
      {...others}
      className={cn(
        "body1 md:body2 xl:body1 font-normal text-grey-500",
        className,
        {
          "text-white": inverted,
        },
      )}
    />
  )
}

type CardContentProps = React.DetailsHTMLAttributes<HTMLParagraphElement>

export const CardContent = ({ className, ...others }: CardContentProps) => {
  const { inverted } = useContext(CardContext)

  return (
    <p
      {...others}
      className={cn("header1 md:header2 xl:header1", className, {
        "text-white": inverted,
      })}
    />
  )
}
