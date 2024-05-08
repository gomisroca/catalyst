import { Card, CardContent } from "@/components/ui/card";
import {
Pagination,
PaginationContent,
PaginationItem,
PaginationLink,
PaginationNext,
PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationWrapper({ page, pageCount, data, onPageChange }: { page: number; pageCount: number; data: unknown[], onPageChange: (page: number) => void }){
    return(
        <Card className="w-fit mx-auto">
            <CardContent className="p-0">
                <Pagination>
                <PaginationContent className="gap-2">
                    <PaginationItem>
                        <PaginationLink 
                        className="w-[3rem] md:w-[4rem] cursor-pointer"
                        onClick={() => onPageChange(1)}>First</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationPrevious 
                        className="w-[3rem] md:w-[6rem] cursor-pointer"
                        onClick={() => onPageChange((page - 1 >= 1 ? page - 1 : 1))} />
                    </PaginationItem>
                    <PaginationItem className="w-[3rem] md:w-[6rem] text-center">
                        {page}
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                        className="w-[3rem] md:w-[6rem] cursor-pointer"
                        onClick={() => onPageChange((page + 1) <=  Math.ceil(data!.length / pageCount) ? page + 1 : Math.ceil(data!.length / pageCount))} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink  
                        className="w-[3rem] md:w-[4rem] cursor-pointer"
                        onClick={() => onPageChange(Math.ceil(data!.length / pageCount))}>Last</PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            </CardContent>
        </Card>
    )
}