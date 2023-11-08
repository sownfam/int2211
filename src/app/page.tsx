"use client"
import PostsGrid from "@/components/posts/posts-grid";
import { userAuth } from "@/states/user";
import { Post } from "@/types/post";
import React from "react";
import { useRecoilValue } from "recoil";

async function getData(userID: string) {
  console.log("???? UID: ", userID);
  const fetchResponse = await fetch(`http://localhost:3000/api/query-user-posts?userID=${userID}`, {cache: 'no-cache'});
  const body = await fetchResponse.text();
  const queryPostsResponse = JSON.parse(body);
  console.log("All Posts response at home: ", queryPostsResponse.posts[0]);
  const allPosts = queryPostsResponse.posts[0] as any[];
  const realPosts: Post[] = allPosts.map(({topic, ...others}) => {
    topic = topic.split(',');
    const categories = topic;
    return {categories, ...others};
  })
  return realPosts;
}

export default function HomePage() {
  const { userID } = useRecoilValue(userAuth);
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);
  React.useEffect(() => {
    async function fetchHomePage() {
      const allPosts = await getData(window.localStorage.getItem("blog-userID") ?? userID);
      setAllPosts(allPosts);
    }
    fetchHomePage();
  }, [])
  return (
    <PostsGrid allPosts={allPosts} />
  );
}
