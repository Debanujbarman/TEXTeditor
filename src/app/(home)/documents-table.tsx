import { LoaderIcon } from "lucide-react";
import { PaginationStatus } from "convex/react";

import{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Doc } from "../../../convex/_generated/dataModel";

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems:number) => void;
    status: PaginationStatus;
};

export const DocumentsTable = ({
    documents,
    loadMore,
    status,
}: DocumentsTableProps) => {
    return(
        <div className=" max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
         {documents === undefined ?(
            <div className="flex items-center justify-center h-24">
                <LoaderIcon className="animate-spin text-muted-foreground size-5"/>
            </div>
         ):(
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="w-[50%]">Title</TableHead>
                        <TableHead className="w-[30%]">Owner</TableHead>
                        <TableHead className="w-[20%]">Created At</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
         )}
        </div>
    );
};