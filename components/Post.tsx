import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div 
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
      className="p-6 hover:bg-gray-50 transition-colors duration-200"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
        {post.title}
      </h2>
      <p className="text-sm text-gray-600 mb-4">By {authorName}</p>
      <div className="prose prose-sm max-w-none text-gray-700">
        <ReactMarkdown children={post.content} />
      </div>
    </div>
  );
};

export default Post;
