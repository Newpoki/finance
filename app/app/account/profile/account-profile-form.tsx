"use client"

import { Form } from "@/components/ui/form"
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react"
import { FieldPath, useForm } from "react-hook-form"
import {
  AccountProfileFormValues,
  accountProfileFormValuesSchema,
  CurrencyCode,
  Locale,
  Profile,
} from "./account-profile-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { updateAccountProfileAction } from "./account-profile-actions"
import { toast } from "sonner"
import {
  ACCOUNT_PROFILE_CURRENCY_CODES,
  ACCOUNT_PROFILE_LANGUAGES_OPTIONS,
  ACCOUNT_PROFILE_TIMEZONES_OPTIONS,
} from "./account-profile-constants"
import { ControlledInput } from "@/components/rhk/controlled-input"
import { ControlledSelect } from "@/components/rhk/controlled-select"
import { getCurrencySymbol } from "@/currency/get-currency-symbol"
import { getCurrencyName } from "@/currency/get-currency-name"
import capitalize from "lodash.capitalize"
import { SaveIcon } from "lucide-react"
import { AccountProfileDeleteDialog } from "./delete/account-profile-delete-dialog"
import { createPortal } from "react-dom"
import { ControlledDateInput } from "@/components/rhk/controlled-date-input"

type AccountProfileFormProps = {
  profile: Profile
}

const generateCurrenciesOptions = (
  locale: Locale,
  currencyCode: CurrencyCode,
) => {
  return {
    value: currencyCode,
    label: `${capitalize(getCurrencyName(locale, currencyCode))} (${getCurrencySymbol(locale, currencyCode)})`,
  }
}

export const AccountProfileForm = ({ profile }: AccountProfileFormProps) => {
  const accountProfileDeleteDialogContainerRef = useRef<HTMLDivElement>(null)
  const [
    accountProfileDeleteDialogContainer,
    setAccountProfileDeleteDialogContainer,
  ] = useState<HTMLDivElement | null>(null)

  const form = useForm<AccountProfileFormValues>({
    resolver: zodResolver(accountProfileFormValuesSchema),
    defaultValues: {
      firstName: profile.first_name ?? "",
      lastName: profile.last_name ?? "",
      birthdate: profile.birthdate ?? null,
      locale: profile.locale,
      currencyCode: profile.currency_code,
      timezone: profile.timezone,
    },
  })

  const [isSubmitting, startTransition] = useTransition()

  const accountProfileCurrenciesOptions = useMemo(() => {
    return [
      generateCurrenciesOptions(
        profile.locale,
        ACCOUNT_PROFILE_CURRENCY_CODES.EUR,
      ),
      generateCurrenciesOptions(
        profile.locale,
        ACCOUNT_PROFILE_CURRENCY_CODES.USD,
      ),
    ]
  }, [profile.locale])

  const onSubmit = useCallback(
    (formValues: AccountProfileFormValues) => {
      startTransition(async () => {
        const response = await updateAccountProfileAction(formValues)

        if (response.type === "success") {
          toast.success("Your account details have been updated")

          return
        }

        if (response.type === "generic") {
          form.setError("root", { message: response.message })
          return
        }

        response.fields.forEach((field) => {
          form.setError(field.path as FieldPath<AccountProfileFormValues>, {
            message: field.message,
          })
        })
      })
    },
    [form],
  )

  useEffect(() => {
    if (
      accountProfileDeleteDialogContainer != null ||
      accountProfileDeleteDialogContainerRef.current == null
    ) {
      return
    }

    setAccountProfileDeleteDialogContainer(
      accountProfileDeleteDialogContainerRef.current,
    )
  }, [accountProfileDeleteDialogContainer])

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-1 flex-col gap-4"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <section className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ControlledInput
              name="firstName"
              control={form.control}
              label="First Name"
              placeholder="John"
              disabled={isSubmitting}
              required
            />

            <ControlledInput
              name="lastName"
              control={form.control}
              label="Last Name"
              placeholder="doe"
              disabled={isSubmitting}
              required
            />

            <ControlledDateInput
              name="birthdate"
              control={form.control}
              label="Birthdate"
              disabled={isSubmitting}
            />

            <ControlledSelect
              control={form.control}
              disabled={isSubmitting}
              name="locale"
              label="Language"
              options={ACCOUNT_PROFILE_LANGUAGES_OPTIONS}
            />

            <ControlledSelect
              control={form.control}
              disabled={isSubmitting}
              name="currencyCode"
              label="Currency"
              options={accountProfileCurrenciesOptions}
            />

            <ControlledSelect
              control={form.control}
              disabled={isSubmitting}
              name="timezone"
              label="Timezone"
              options={ACCOUNT_PROFILE_TIMEZONES_OPTIONS}
            />
          </section>

          <div className="flex flex-col gap-3 md:flex-row">
            <Button className="w-full gap-2 md:w-fit" disabled={isSubmitting}>
              <SaveIcon />
              <span>Save</span>
            </Button>

            <div ref={accountProfileDeleteDialogContainerRef} />
          </div>
        </form>
      </Form>

      {/* We must insisert it with a portal, otherwise there the two Form provider conflict
        and submiting delete account also submit the profile edition */}
      {accountProfileDeleteDialogContainer != null &&
        createPortal(
          <AccountProfileDeleteDialog
            disabled={isSubmitting}
            profile={profile}
          />,
          accountProfileDeleteDialogContainer,
        )}
    </>
  )
}
