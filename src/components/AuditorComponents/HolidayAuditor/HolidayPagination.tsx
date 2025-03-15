import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface HolidayPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalHolidays: number;
  holidaysPerPage: number;
}

const HolidayPagination: React.FC<HolidayPaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalHolidays,
  holidaysPerPage
}) => {
  const totalPages = Math.ceil(totalHolidays / holidaysPerPage);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (page) => (
            <PaginationItem key={page}>
              <PaginationLink 
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext 
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default HolidayPagination;