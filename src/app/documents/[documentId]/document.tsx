"use client"

import { Preloaded, usePreloadedQuery } from "convex/react";
import { useEffect } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import { Navbar } from "./navbar";
import{Editor} from "./editor"
import { Toolbar } from "./toolbar";
import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";



interface DocumentProps{
   preloadedDocument: Preloaded<typeof api.documents.getById>
};

 export const Document = ({preloadedDocument}: DocumentProps) => {
     const doc = usePreloadedQuery(preloadedDocument);
     const { setMarginsFromDoc } = useEditorStore();
    useEffect(() => {
     setMarginsFromDoc(doc); // ✅ Set from Convex
  }, [doc]);
 
    return ( 
        <div className="min-h-screen bg-[#FAFBFD]">
         <div  className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
             <Navbar data={doc}/>
            <Toolbar/>
            </div>
            <div className="pt-[114px] print:pt-0">
             <Editor initialContent={doc.initialContent}/>
             
            </div>
        </div>
     );
}
 
