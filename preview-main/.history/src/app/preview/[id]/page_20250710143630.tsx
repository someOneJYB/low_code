export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
//   const post = await getPost(slug)
 console.log(id, 'id')
  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}