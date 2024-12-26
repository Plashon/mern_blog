import React from "react";
const baseUrl = import.meta.env.VITE_PIC_URL;

const Post = ({ title, summary, author, cover, createdAt,_id }) => {
  return (
    <>
    <div className="card card-side bg-base-100 shadow-xl mb-4 w-4/6 mx-auto flex flex-wrap">
      <figure className="flex-shrink-0 w-full md:w-1/3" > 
        <a href={`/postDetail/${_id}`} className="href">
        <img src={`${baseUrl}/${cover}`} alt={title} className="w-full h-64 object-fill" />
        </a>
      </figure>
      <div className="p-6 w-full md:w-2/3 flex flex-col justify-between">
        <a href={`/postDetail/${_id}`} className="hover:underline">
          <h2 className="card-title">{title}</h2>
        </a>
        <p className="text-gray-500 text-sm">
          {author.username} - {createdAt}
        </p>
        <div className="card-actions mt-4">
          <p className="line-clamp-5 text-ellipsis overflow-hidden">{summary}</p>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default Post;
