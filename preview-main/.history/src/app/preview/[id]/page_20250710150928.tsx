import { getData } from "@/lib/data";
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const post = await getData(id);
    console.log(post);
    return (
      <div>
        <h1>{id}</h1>
      </div>
    );
  } catch (err: unknown | { message?: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <h1>{(err as any).message || "刷新一下～"}</h1>;
  }
}
