"use client"
import PostsGrid from "@/components/posts/posts-grid";
import { userAuth } from "@/states/user";
import { Post } from "@/types/post";
import { useRecoilValue } from "recoil";

async function getData() {
  const { userID } = useRecoilValue(userAuth);
  console.log("???? UID: ", userID);
  const fetchResponse = await fetch(`http://localhost:3000/api/query-user-posts?userID=${userID}`, {cache: 'no-store'});
  const body = await fetchResponse.text();
  const queryPostsResponse = JSON.parse(body);
  console.log("All Posts response: ", queryPostsResponse.posts[0]);
  const allPosts = queryPostsResponse.posts[0] as any[];
  const realPosts: Post[] = allPosts.map(({topic, ...others}) => {
    topic = topic.split(',');
    const categories = topic;
    return {categories, ...others};
  })
  return realPosts;
}

export default async function HomePage() {
  const allPosts = await getData();
  return (
    <PostsGrid allPosts={allPosts} />
  );
}
