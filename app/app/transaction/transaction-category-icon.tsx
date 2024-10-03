"use client"

import { useMemo } from "react"
import { TransactionCategoryIcons } from "./transaction-types"
import {
  AppleIcon,
  BikeIcon,
  BusIcon,
  CarIcon,
  CarrotIcon,
  CigaretteIcon,
  CookingPotIcon,
  FilmIcon,
  FuelIcon,
  HandPlatterIcon,
  LucideProps,
  ReceiptEuro,
  RssIcon,
  SmartphoneIcon,
  TrainFrontIcon,
  TramFrontIcon,
  UserIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TransactionCategoryIconProps = LucideProps & {
  name: TransactionCategoryIcons
}

const iconMapping: Record<
  TransactionCategoryIcons,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
> = {
  apple: AppleIcon,
  bike: BikeIcon,
  bills: ReceiptEuro,
  bus: BusIcon,
  car: CarIcon,
  carrot: CarrotIcon,
  cooking_pot: CookingPotIcon,
  cigarette: CigaretteIcon,
  film: FilmIcon,
  fuel: FuelIcon,
  hand_plater: HandPlatterIcon,
  rss: RssIcon,
  smartphone: SmartphoneIcon,
  tram_front: TramFrontIcon,
  train_front: TrainFrontIcon,
  user: UserIcon,
}

export const TransactionCategoryIcon = ({
  name,
  className,
  ...others
}: TransactionCategoryIconProps): JSX.Element => {
  const Component = useMemo(() => {
    return iconMapping[name]
  }, [name])

  return <Component {...others} className={cn("shrink-0", className)} />
}
