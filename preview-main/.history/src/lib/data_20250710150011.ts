export async function getData(id: string) {
  const res = await fetch(`http://localhost:8089/lowCode/view/${id}`)
 console.log()
  return res.json()
}