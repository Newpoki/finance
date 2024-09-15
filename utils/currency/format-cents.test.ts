import { describe, expect, it } from "vitest"
import { formatCents } from "./format-cents"

describe("formatCents", () => {
  describe.each([
    {
      amount: 1500,
      locale: "fr-FR",
      currencyCode: "EUR",
      expected: "+15,00\xa0€",
    },
    {
      amount: 1500,
      locale: "fr-FR",
      currencyCode: "USD",
      expected: "+15,00\xa0$US",
    },
    {
      amount: 1500,
      locale: "en-US",
      currencyCode: "EUR",
      expected: "+€15.00",
    },
    {
      amount: 1500,
      locale: "en-US",
      currencyCode: "USD",
      expected: "+$15.00",
    },
    {
      amount: -1500,
      locale: "fr-FR",
      currencyCode: "EUR",
      expected: "-15,00\xa0€",
    },
    {
      amount: -1500,
      locale: "fr-FR",
      currencyCode: "USD",
      expected: "-15,00\xa0$US",
    },
    {
      amount: -1500,
      locale: "en-US",
      currencyCode: "EUR",
      expected: "-€15.00",
    },
    {
      amount: -1500,
      locale: "en-US",
      currencyCode: "USD",
      expected: "-$15.00",
    },
  ])(
    "amount is %amount, locale $locale and currencyCode $currencyCode",
    ({ amount, locale, currencyCode, expected }) => {
      it(`should return ${expected}`, () => {
        const current = formatCents(amount, locale, currencyCode)

        expect(current).toBe(expected)
      })
    },
  )
})
