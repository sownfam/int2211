import CategoryFilter from "@/components/filter/category-filter";
import SearchBar from "@/components/filter/search-bar";
import PostsGrid from "@/components/posts/posts-grid";
import { httpGet } from "@/modules/next-backend-client/client";
import { getAllPosts } from "@/services/posts";
import { toUniqueArray } from "@/utils/to-unique-array";
import React from "react";
import { Post } from "@/types/post";

export const metadata = {
  title: "Blog",
  description: "This is blog page.",
};

async function getData() {  
  const fetchResponse = await fetch("http://localhost:3000/api/query-all-posts", {cache: 'no-cache'});
  const body = await fetchResponse.text();
  const queryPostsResponse = JSON.parse(body);
  const allPosts = (queryPostsResponse.posts[0] ?? [])  as any[];
  //const allPosts = queryPostsResponse.posts[0] as any[];
  const realPosts: Post[] = allPosts.map(({categories, ...others}) => {
    categories = categories.split(',');
    return {categories, ...others};
  })
  return realPosts;
}

export default async function BlogPage() {
  const allPosts = await getData();
  const allCategories = toUniqueArray(allPosts.map(post => post.categories).flat());
  return (
    <>
      <section className="mb-16 mt-0 space-y-8 md:mt-20">
        <SearchBar />
        <CategoryFilter allCategories={allCategories} />
      </section>
      <PostsGrid allPosts={allPosts} />
    </>
  );
}
