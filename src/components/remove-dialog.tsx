"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";

import{
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/router";


interface RemoveDialogProps {
   documentId: Id<"documents">; 
   children: React.ReactNode;
};

export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
    const router = useRouter();
    const remove = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false) ;

   return (
     <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
       </AlertDialogTrigger>
          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                   This action cannot be undo. This will permanently delete your
                    document.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isRemoving} 
                onClick={(e)=> {
                 e.stopPropagation(); 
                 setIsRemoving (true);
                 remove({ id: documentId })
                   .catch(()=>toast.error("Something went wrong"))
                   .then(()=>{
                    toast.success("Document removed");
                    router.push("/")
                })
                   .finally(() => setIsRemoving(false));
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
           </AlertDialogContent>
      </AlertDialog>
    );
};
