import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const PAGE_VIEW_SIZE = 5;

export default async function PaginationUI({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const currentGroup = Math.floor((currentPage - 1) / PAGE_VIEW_SIZE);

  const startPage = currentGroup * PAGE_VIEW_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_VIEW_SIZE - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div>
      <Pagination className='mt-6'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/transactions?page=${Math.max(currentPage - 1, 1)}`}
              aria-disabled={currentPage === 1}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {pages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href={`/transactions?page=${p}`}
                isActive={p === currentPage}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={`/transactions?page=${Math.min(currentPage + 1, totalPages)}`}
              aria-disabled={currentPage === totalPages}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
