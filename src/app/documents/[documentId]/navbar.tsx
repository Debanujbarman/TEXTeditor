import Image from "next/image"
import Link from "next/link";

import {
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator,
  MenubarShortcut, 
  MenubarSub,
  MenubarSubContent, 
  MenubarSubTrigger, 
  MenubarTrigger,
  } from "@/components/ui/menubar";

import { DocumentInput } from "./document-input";
import { FileIcon, FileJsonIcon, FileTextIcon, GlobeIcon } from "lucide-react";
import { BsFilePdf } from "react-icons/bs";

const TestInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">Inline Test</span>
    </div>
  );
};


export const Navbar = () => {
  return ( 
     <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36}/>
         </Link>
         <div className="flex flex-col">
         <DocumentInput/>
            <div className="flex">
               <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                 <MenubarMenu>
                   <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto" >
                    File
                   </MenubarTrigger>
                   <MenubarContent className="print:hidden">
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <FileIcon className="size-4 mr-2"/>
                          Save
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>
                          <FileJsonIcon className="size-4 mr-2"/>
                          JSON
                        </MenubarItem>
                        <MenubarItem>
                          <GlobeIcon className="size-4 mr-2"/>
                           HTML
                        </MenubarItem>
                        <MenubarItem>
                          <BsFilePdf className="size-4 mr-2"/>
                           PDF
                        </MenubarItem>
                        <MenubarItem>
                          <FileTextIcon className="size-4 mr-2"/>
                           Text
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                   </MenubarContent>
                 </MenubarMenu>
                 <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto" >           
                     Edit
                  </MenubarTrigger>
                 </MenubarMenu>
               </Menubar>
            </div>
         </div>
      </div>
    </nav>
    );
};  



