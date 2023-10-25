// Currently not working, the tailwind doesn't apply here, gonna fix that, or not...
import Flex from "@/components/flex";
import Tiptap from "@/components/tiptap";
import { JSONContent } from "@tiptap/react";
import * as React from "react";

export default function Playground() {
  const [content, setContent] = React.useState<string>("");
  const [editorText, setEditorText] = React.useState<string>("");
  return (
    // <Flex.Col gap="12px">
    //   <div content="Description" className="bg-red" id="rnd" />
    //   <Tiptap content={content} setContent={setContent} editorText={editorText} />
    // </Flex.Col>
    <div className="bg-red-300	" >
       <Tiptap content={content} setContent={setContent} editorText={editorText} />
    </div>
  );
}
