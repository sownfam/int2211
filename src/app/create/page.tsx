'use client'

import Tiptap from '@/components/tiptap';
import React from 'react';

export default function CreatePage() {
  const [content, setContent] = React.useState<string>("");
  const [editorText, setEditorText] = React.useState<string>("");
  return (
    <div>
      <Tiptap content={content} setContent={setContent} editorText={editorText} />
    </div>
  );
}
