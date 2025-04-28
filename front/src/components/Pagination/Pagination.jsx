import React from 'react';
import './style.css';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) {
  const pageNumbers = [];
  
  // Create page numbers array
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Limit displayed page numbers for better UX
  const getVisiblePageNumbers = () => {
    // Always show current page, and some before/after
    const delta = 2;
    const range = [];
    
    // Calculate start and end
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);
    
    // If we're near the start, show more pages after
    if (currentPage - delta < 1) {
      end = Math.min(totalPages, end + (1 - (currentPage - delta)));
    }
    
    // If we're near the end, show more pages before
    if (currentPage + delta > totalPages) {
      start = Math.max(1, start - ((currentPage + delta) - totalPages));
    }
    
    // Add pages to range
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    // Add dots and first/last page when needed
    const result = [];
    
    // Add first page and dots if needed
    if (start > 1) {
      result.push(1);
      if (start > 2) result.push('...');
    }
    
    // Add visible range
    result.push(...range);
    
    // Add dots and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) result.push('...');
      result.push(totalPages);
    }
    
    return result;
  };

  return (
    <div className="pagination">
      <button 
        className="pagination-button" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      
      <div className="pagination-numbers">
        {getVisiblePageNumbers().map((pageNum, index) => (
          pageNum === '...' ? (
            <span key={`dots-${index}`} className="pagination-dots">...</span>
          ) : (
            <button
              key={pageNum}
              className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          )
        ))}
      </div>
      
      <button 
        className="pagination-button" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}