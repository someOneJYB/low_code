import {getData} from '@/lib/data'
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params
    try {
            const post = await getData(id)
 console.log(post)
  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
    } catch (err) {
        <h1>{err.message || '刷新chong shi' }</h1>
    }
}