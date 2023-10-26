"use client";

import Flex from "@/components/flex";
import Tiptap from "@/components/tiptap";
import React from "react";

export default function CreatePage() {
  const [content, setContent] = React.useState<string>("");
  const [editorText, setEditorText] = React.useState<string>("");
  const [editorHtml, setEditorHtml] = React.useState<string>("");
  return (
    <Flex.Col gap="12px">
      <Tiptap
        content={content}
        setContent={setContent}
        editorText={editorText}
        setEditorHtml={setEditorHtml}
      />
    </Flex.Col>
  );
}
