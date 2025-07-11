// "use client"
// import StarterKit from '@tiptap/starter-kit'
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
// import ListItem from "@tiptap/extension-list-item";
// import TaskItem from '@tiptap/extension-task-item'
// import TaskList from '@tiptap/extension-task-list'
// import Table from '@tiptap/extension-table'
// import Image from '@tiptap/extension-image'
// import TextAlign from '@tiptap/extension-text-align'
// import Link from '@tiptap/extension-link'
// import { Color } from '@tiptap/extension-color'
// import  Highlight from "@tiptap/extension-highlight"
// import FontFamily from '@tiptap/extension-font-family'
// import TextStyle from '@tiptap/extension-text-style'
// import Underline  from '@tiptap/extension-underline'
// import ImageResize from 'tiptap-extension-resize-image'
// import TableCell from '@tiptap/extension-table-cell'
// import TableHeader from '@tiptap/extension-table-header'
// import TableRow from '@tiptap/extension-table-row'
// import { useEditor, EditorContent } from '@tiptap/react'


// import { useEditorStore } from '@/store/use-editor-store';
// import { FontSizeExtension } from '@/extensions/font-size'
// import { LineHeightExtension } from '@/extensions/line-height';
// import { Ruler } from './ruler';


// interface EditorProps{
//  initialContent?: string | undefined;
// };

// export const Editor =({initialContent}: EditorProps)=>{
    

//     const {setEditor,leftMargin, rightMargin} = useEditorStore();

//     const editor = useEditor({
//      content: initialContent,
//       immediatelyRender: false,
//         onCreate ({ editor }) {
//            setEditor(editor);
//         },
//         onDestroy () {
//             setEditor(null);
//         },
//         onUpdate({editor}) {
//             setEditor(editor);
            
//         },
//         onSelectionUpdate({editor}) {
//             setEditor(editor);
//         },
//         onTransaction({editor}) {
//             setEditor(editor);
//         },
//         onFocus({editor}) {
//             setEditor(editor);
//         },
//         onBlur({editor}) {
//             setEditor(editor);
//         },
//         onContentError({editor}) {
//             setEditor(editor);
//         },
//         editorProps: {
//             attributes:{
//                 style:`padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
//                 class: "focus:outline-none print:border-0 bg-white border-[#C7C7C7] flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
//             },
//         },
//         extensions: [
//             StarterKit,
//             LineHeightExtension,
//             // BulletList,
//             // OrderedList,
//             // ListItem,
//             FontSizeExtension,
//             TextAlign.configure({
//                 types: ['heading', 'paragraph', 'blockquote', 'listItem', 'taskItem', 'tableCell'],
                
//             }),
//             Link.configure({
//                 openOnClick: false,
//                 autolink: true,
//                 defaultProtocol: 'https',
//               }),
//             Color,
//             Highlight.configure({
//                 multicolor: true,
//               }),
//             FontFamily,
//             TextStyle,
//             // // FontSize,
//             OrderedList,
//             BulletList,
//             Underline,
//             Table,
//             Image,
//             ImageResize,
//             TableCell,
//             TableHeader,
//             TableRow,
//             TaskItem.configure({
//                 nested: true,
//               }),
//             TaskList,
//         ],
//       })
      
//     return(
//         <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
//           <Ruler/>
//          <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'> 
//             <EditorContent editor={editor} />
//          </div>
//         </div>
//     );
// };

"use client";

import { useRef } from "react";
// import { debounce } from "lodash";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import { useEditorStore } from "@/store/use-editor-store";

import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { Ruler } from "./ruler";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";



interface EditorProps {
  initialContent?: string;
}

export const Editor = ({ initialContent }: EditorProps) => {
  const { setEditor, leftMargin, rightMargin } = useEditorStore();
  const saveContent = useMutation(api.documents.updateContent);
  const docId = useParams().documentId as Id<"documents">;

  const debouncedSave = useRef(
    useDebounce((html: string) => {
      saveContent({
        id: docId,
        content: html,
        leftMargin,
        rightMargin,
      });
    }, 1000)
  ).current;

  const editor = useEditor({
    content: initialContent,
    extensions: [
      StarterKit,
      FontSizeExtension,
      LineHeightExtension,
      BulletList,
      OrderedList,
      ListItem,
      TaskItem.configure({ nested: true }),
      TaskList,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TextStyle,
      FontFamily,
      Underline,
      Image,
      ImageResize,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph", "blockquote", "listItem", "taskItem", "tableCell"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
        class:
          "focus:outline-none print:border-0 bg-white border-[#C7C7C7] flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    onCreate({ editor }) {
      setEditor(editor);
    },
    onUpdate({ editor }) {
      setEditor(editor);
      const html = editor.getHTML();
      debouncedSave(html);
    },
  });

  const handleManualSave = () => {
    if (!editor) return;
    const html = editor.getHTML();
    saveContent({
      id: docId,
      content: html,
      leftMargin,
      rightMargin,
    });
  };

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
      {/* Optional: a Save button */}
      {/* <button onClick={handleManualSave}>Save</button> */}
    </div>
  );
};
