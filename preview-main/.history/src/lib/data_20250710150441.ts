export async function getData(id: string) {
  const res = await fetch(`http://localhost:8089/lowCode/view/${id}`)
  return res.json()
}