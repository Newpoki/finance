"use client"

// import {
//   FieldPath,
//   FieldValues,
//   PathValue,
//   UseControllerProps,
// } from "react-hook-form"
// import { FormControl, FormField, FormItem, FormLabel } from "../ui/form"
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
// import { Button } from "../ui/button"
// import { cn } from "@/lib/utils"
// import { formatDate } from "@/date/format-date"
// import { CalendarIcon } from "lucide-react"
// import { Calendar } from "../ui/calendar"
// import { useCallback } from "react"

// // type AllowedControllerProps<
// //   TFieldValues extends FieldValues = FieldValues,
// //   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// // > = Omit<ControllerProps<TFieldValues, TName>, "render">

// // type RHKDayPickerProps<
// //   TFieldValues extends FieldValues = FieldValues,
// //   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// // > = AllowedControllerProps<TFieldValues, TName> & {
// //   label?: string
// //   getDisplayedLabel?: (value: PathValue<TFieldValues, TName>) => React.ReactNode
// // }

// interface GenericTextfieldProps<
//   TFieldValues extends FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// > extends UseControllerProps<TFieldValues> {
//   label?: string
//   getDisplayedLabel?: (value: PathValue<TFieldValues, TName>) => React.ReactNode
// }

// export const RHKDayPicker = <
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// >({
//   // Custom props
//   label,
//   getDisplayedLabel,
//   // Controller Props
//   name,
//   control,
//   defaultValue,
//   disabled,
//   rules,
//   shouldUnregister,
// }: GenericTextfieldProps<TFieldValues>) => {
//   const handleGetLabel = useCallback(
//     (value: PathValue<TFieldValues, TName>) => {
//       if (getDisplayedLabel) {
//         return getDisplayedLabel(value)
//       }

//       return value != null
//         ? formatDate({
//             date: value,
//             // locale: profile.locale,
//             locale: "fr-FR",
//             // Not specifying a TZ because if it's different from user browser
//             // The selected date might be different than the one he clicked on
//           })
//         : "Select a date"
//     },
//     [getDisplayedLabel],
//   )

//   return (
//     <FormField
//       name={name}
//       control={control}
//       defaultValue={defaultValue}
//       disabled={disabled}
//       rules={rules}
//       shouldUnregister={shouldUnregister}
//       render={({ field }) => (
//         <FormItem className="flex flex-col">
//           <FormLabel className="w-fit">{label}</FormLabel>
//           <Popover>
//             <PopoverTrigger asChild>
//               <FormControl>
//                 <Button
//                   variant="outlined"
//                   className={cn("h-11 w-full text-left font-normal")}
//                   disabled={field.disabled}
//                 >
//                   {handleGetLabel(field.value)}
//                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="single"
//                 selected={field.value ?? undefined}
//                 onSelect={field.onChange}
//               />
//             </PopoverContent>
//           </Popover>
//         </FormItem>
//       )}
//     />
//   )
// }
