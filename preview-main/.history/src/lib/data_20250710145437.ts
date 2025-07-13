export async function getData() {
  const res = await fetch('http://localhost:8089/lowCode/', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}