export async function fetchDolarData() {
  const res = await fetch('https://ve.dolarapi.com/v1/dolares')
  return res.json()
}