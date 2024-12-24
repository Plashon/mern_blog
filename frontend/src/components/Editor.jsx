import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { forwardRef, useRef, useImperativeHandle } from "react";

const Editor = forwardRef(({ value, onChange }, ref) => {
  const quillRef = useRef(null);
  useImperativeHandle(ReferenceError, () => {
    getQuill: () => {
      return quillRef.current.getEditor();
    };
  });

  const toolbarOption = [
    [{ header: [1, 2, false] }], // Combine header options
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ align: [] }], // Include alignment options (left, center, right)
    ["image"],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOption,
  };

  return (
    <div
      className="content h-full max-h-screen overflow-y-auto "
    >
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        bounds="#scrolling-container"
        scrollingContainer=".parent-scroll"
      />
    </div>
  );
});

export default Editor;
