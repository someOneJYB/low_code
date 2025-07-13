import {getData} from '@/lib/data'
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params
    try {
          const post = await getData(id)
    } catch (err) {
        
    }
}