import { ecbUrl } from '@/constants'

export type RatesMap = Record<string, number>

export async function fetchRates() {
  const response = await fetch(ecbUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch rates: ${response.status}`)
  }

  const text = await response.text()
  const doc = new DOMParser().parseFromString(text, 'application/xml')
  const cubes = doc.querySelectorAll('Cube[currency]')

  const rates: RatesMap = { EUR: 1 }

  cubes.forEach((cube) => {
    const currency = cube.getAttribute('currency')
    const rate = cube.getAttribute('rate')

    if (currency && rate) {
      rates[currency] = +rate
    }
  })

  return rates
}
