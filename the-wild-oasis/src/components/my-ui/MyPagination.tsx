"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Props {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function MyPagination({ pagination, onPageChange }: Props) {
  const { page, limit, total, totalPages, hasNextPage, hasPrevPage } =
    pagination;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between p-2 text-sm">
      <div className="w-full">
        Showing <span className="font-medium">{start}</span> to{" "}
        <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{total}</span> results
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(1)}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              >
                First
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationPrevious
                onClick={() => hasPrevPage && onPageChange(page - 1)}
                className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => hasNextPage && onPageChange(page + 1)}
                className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(totalPages)}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              >
                Last
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
