export async function getData() {
  const res = await fetch('http', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}