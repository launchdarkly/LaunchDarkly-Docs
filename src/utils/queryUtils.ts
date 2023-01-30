export function getQueryParams(location: Location, param: string): string {
  // If there's a hash in url, it doesn't
  // properly parse query params
  // this could happen for section headers in search
  const query = location.search ? location.search : ''

  const searchParams = new URLSearchParams(query)

  const q = searchParams.get(param)
  return q
}
