export async function getData() {
  const res = await fetch('http://localhost:', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}