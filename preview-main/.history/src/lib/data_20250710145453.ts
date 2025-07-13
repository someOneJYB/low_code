export async function getData(id) {
  const res = await fetch(`http://localhost:8089/lowCode/${id}`, {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}