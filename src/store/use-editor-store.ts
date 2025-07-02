import {create } from "zustand";
import{ type Editor} from "@tiptap/react";
import { Doc, Id } from "../../convex/_generated/dataModel";


// interface EditorState {
//     editor: Editor | null;
//     setEditor: (editor: Editor | null) => void;
// };

// export const useEditorStore = create<EditorState>((set) => ({
//     editor: null,
//     setEditor: (editor) => set({ editor }),
// }));

// interface EditorState {
//   editor: any;
//   setEditor: (editor: any) => void;
//   leftMargin: number;
//   rightMargin: number;
//   setMargins: (left: number, right: number) => void;
// }

// export const useEditorStore = create<EditorState>((set) => ({
//   editor: null,
//   setEditor: (editor) => set({ editor }),
//   leftMargin: 56, // default margin in pixels
//   rightMargin: 56,
//   setMargins: (left, right) => set({ leftMargin: left, rightMargin: right }),
// }));
interface EditorState {
  editor: Editor | null;
   docId: Id<"documents"> | null; 
  setEditor: (editor: Editor | null) => void;
  leftMargin: number;
  rightMargin: number;
  setMargins: (left: number, right: number) => void;
  setMarginsFromDoc: (doc: Doc<"documents">) => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  editor: null,
   docId: null,
  setEditor: (editor) => set({ editor }),
  leftMargin: 56,
  rightMargin: 56,
  setMargins: (left, right) => set({ leftMargin: left, rightMargin: right }),
  setMarginsFromDoc: (doc) =>
    set({
      leftMargin: doc.leftMargin ?? 56,
      rightMargin: doc.rightMargin ?? 56,
      docId: doc._id, 
    }),
}));