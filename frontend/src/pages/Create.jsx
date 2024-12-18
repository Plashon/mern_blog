import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Create = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-5/6">
        <h1 className="text-2xl font-bold text-center mb-4">Create Post</h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="summary"
            >
              Summary
            </label>
            <input
              type="text"
              id="summary"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <ReactQuill
              id="content"
              className="textarea textarea-bordered w-full"
              rows="4"
             theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }], // Combine header options
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  ["link"],
                  [{ align: [] }], // Include alignment options (left, center, right)
                  ["image"],
                  ["clean"],
                ],
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary w-full">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create