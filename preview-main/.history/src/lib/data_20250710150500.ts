export async function getData(id: string) {
    try {
  const res = await fetch(`http://localhost:8089/lowCode/view/${id}`)
    } catch (err) {
        
    }
  return res.json()
}