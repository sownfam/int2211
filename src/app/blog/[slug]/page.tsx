"use client";
import Flex from "@/components/flex";
import { httpGet } from "@/modules/next-backend-client/client";
import { userAuth } from "@/states/user";
import React from "react";
import { useRecoilValue } from "recoil";

async function getBlogContent(slug: string) {
  const searchParams = new URLSearchParams();
  searchParams.append("slug", slug);
  const fetchPath =
    "http://localhost:3000" +
    "/api/query-blog-content" +
    `?${searchParams.toString()}`;

  const response = await fetch(fetchPath, { cache: "no-store" });
  const body = await response.text();
  const data = JSON.parse(body);
  const value = data.posts[0][0].content;
  const blogID = data.posts[0][0].id;
  return { value, blogID };
}

async function getBlogComments(slug: string) {
  const searchParams = new URLSearchParams();
  searchParams.append("slug", slug);
  const fetchPath =
    "http://localhost:3000" +
    "/api/query-blog-comment" +
    `?${searchParams.toString()}`;

  const response = await fetch(fetchPath);
  const body = await response.text();
  const data = JSON.parse(body);
  console.log("All comments: ", data.comments[0].map((x: any) => x.content));
  // return data.posts[0];
  return data.comments[0].map((x: any) => x.content);
}

export default function BlogContent({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { userID } = useRecoilValue(userAuth);
  const [userComment, setUserComment] = React.useState<string>("");
  const [value, setValue] = React.useState<string>("");
  const [blogID, setBlogID] = React.useState<string>("");
  const [allComments, setAllComments] = React.useState<string[]>([]);
  React.useEffect(() => {
    async function getData() {
      const { value, blogID } = await getBlogContent(slug);
      const allComments = await getBlogComments(slug);
      setValue(value);
      setBlogID(blogID);
      setAllComments(allComments);
    }
    getData();
  }, []);

  const insertComment = async () => {
    console.log("comment: ", userComment);
    const insertParams = new URLSearchParams();
    insertParams.append("blogId", blogID);
    insertParams.append("content", userComment);
    insertParams.append("userId", userID);

    const insertCommentResponse = await httpGet(
      "insert-blog-comment",
      insertParams
    );

    if (!insertCommentResponse.ok) {
      alert(insertCommentResponse.error);
    } else {
      console.log(insertCommentResponse.response);
      window.location.reload();
    }
  };

  return (
    <Flex.Col gap="36px">
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
      <Flex.Col className="w-full" gap="12px">
        {allComments.length === 0 ? (
          <div>Be the First to comment!</div>
        ) : (
          allComments.map((cmt) => <div>{cmt}</div>)
        )}
        <textarea
          className="w-full bg-zinc-200 px-2"
          placeholder="Place your comment here"
          // value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        />
        <div>
          <button
            className="bg-amber-200 px-2 py-2 rounded-lg font-bold"
            onClick={insertComment}
          >
            Comment
          </button>
        </div>
      </Flex.Col>
    </Flex.Col>
  );
}
