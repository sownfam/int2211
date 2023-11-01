async function getBlogContent(slug: string) {
  const mockContent = "<div> Hello World </div>";
  // const searchParams = new URLSearchParams();
  // searchParams.append("slug", slug);
  // const fetchPath =
  //   "http://localhost:3000" +
  //   "/api/query-blog-content" +
  //   `?${searchParams.toString()}`;
  
  // const response = await fetch(fetchPath);
  // const body = await response.text();
  // const data = JSON.parse(body);
  // return data.posts[0][0].content;
  return mockContent;
}

export default async function BlogContent({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const value = await getBlogContent(slug);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </>
  );
}
