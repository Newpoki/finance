"use client"

import { FieldPath, FieldValues } from "react-hook-form"
import { ControlledInput, ControlledInputProps } from "./controlled-input"
import { Button } from "../ui/button"
import { useCallback, useState } from "react"
import EyeSlash from "@/icons/eye-slash.svg"
import Eye from "@/icons/eye.svg"

type ControlledPasswordInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<ControlledInputProps<TFieldValues, TName>, "type">

export function ControlledPasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  disabled,
  placeholder = "***********",
  ...others
}: ControlledPasswordInputProps<TFieldValues, TName>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((current) => !current)
  }, [])

  return (
    <ControlledInput
      {...others}
      disabled={disabled}
      placeholder={placeholder}
      type={isPasswordVisible ? "text" : "password"}
      endAdornment={
        <Button
          variant="ghost"
          disabled={disabled}
          className="-m-4 font-bold"
          type="button"
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? <Eye /> : <EyeSlash />}
        </Button>
      }
    />
  )
}
