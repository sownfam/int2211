"use client";

import Flex from "@/components/flex";
import Tiptap from "@/components/tiptap";
import React from "react";

import { Cascader } from "antd";
import { Topic } from "@/types/topic";
import { allTopics } from "@/lib/const";

interface Option {
  value: string;
  label: string;
  children?: Option[];
  disableCheckbox?: boolean;
  // topicID: number;
}

const options: Option[] = [
  {
    value: "Backend",
    label: "Backend",
  },
  {
    value: "Frontend",
    label: "Frontend",
  },
  {
    value: "Cloud",
    label: "Cloud",
  },
  {
    value: "Database",
    label: "Database",
  },
];

export default function CreatePage() {
  const [content, setContent] = React.useState<string>("");
  const [editorText, setEditorText] = React.useState<string>("");
  const [editorHtml, setEditorHtml] = React.useState<string>("");
  const [blogTitle, setBlogTitle] = React.useState<string>("");
  const [topic, setTopic] = React.useState<Topic[]>([]);

  const onChange = (value: string | any[]) => {
    let length = value.length;
    let _topic: Topic[] = [];
    for (let i = 0; i < length; i++) {
      for(let j = 0; j < allTopics.length; j++) if (allTopics[j].name === value[i][0]){
        _topic.push(allTopics[j]);
      }
    }
    setTopic(_topic);
  };

  return (
    <Flex.Col gap="12px">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-3xl font-bold text-gray-700"
        >
          Title
        </label>
        <input
          type="title"
          onChange={(e) => {
            setBlogTitle(e.target.value);
          }}
          className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white rounded-lg"
          style={{
            border: "2px solid black",
            backgroundColor: "floralwhite",
            fontWeight: "bold",
          }}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-3xl font-bold text-gray-700 mb-2"
        >
          Categories
        </label>
        <Cascader
          style={{
            width: "100%",
            backgroundColor: "floralwhite",
            border: "2px solid black",
          }}
          multiple
          bordered
          options={options}
          onChange={onChange}
          className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white rounded-lg"
        />
      </div>
      <Tiptap
        content={content}
        setContent={setContent}
        editorText={editorText}
        setEditorHtml={setEditorHtml}
        blogTitle={blogTitle}
        topic={topic}
      />
    </Flex.Col>
  );
}
