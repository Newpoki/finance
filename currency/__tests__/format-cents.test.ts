import { describe, expect, it } from "vitest"
import { formatCents } from "../format-cents"

describe("formatCents", () => {
  describe.each([
    {
      cents: 1500,
      locale: "fr-FR",
      currencyCode: "EUR",
      expected: "+15,00\xa0€",
    },
    {
      cents: 1500,
      locale: "fr-FR",
      currencyCode: "USD",
      expected: "+15,00\xa0$US",
    },
    {
      cents: 1500,
      locale: "en-US",
      currencyCode: "EUR",
      expected: "+€15.00",
    },
    {
      cents: 1500,
      locale: "en-US",
      currencyCode: "USD",
      expected: "+$15.00",
    },
    {
      cents: -1500,
      locale: "fr-FR",
      currencyCode: "EUR",
      expected: "-15,00\xa0€",
    },
    {
      cents: -1500,
      locale: "fr-FR",
      currencyCode: "USD",
      expected: "-15,00\xa0$US",
    },
    {
      cents: -1500,
      locale: "en-US",
      currencyCode: "EUR",
      expected: "-€15.00",
    },
    {
      cents: -1500,
      locale: "en-US",
      currencyCode: "USD",
      expected: "-$15.00",
    },
  ] as const)(
    "amount is %amount, locale $locale and currencyCode $currencyCode",
    ({ cents, locale, currencyCode, expected }) => {
      it(`should return ${expected}`, () => {
        const current = formatCents({ cents, locale, currencyCode })

        expect(current).toBe(expected)
      })
    },
  )
})
