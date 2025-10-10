import React, { useState } from 'react';


const itemsPerPage = 1;

const Pagination = ({ movies, setPage, page }) => {

    const totalPages = Math.ceil(movies.length / itemsPerPage);

    const handlePageChange = (page) => {
        setPage(page);
        window.scrollTo(0, 0); // Scroll to top on page change
    };


    return (
        <div>
            <div style={{ padding: "0 0 10px 0", display: "flex", justifyContent: "center" }}>
                {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    
                    // Page buttons styles
                    const PageButtonStyles = {
                        margin: '0 4px',
                        padding: pageNum < 10 ? '8px 12px' : '8px 9px',
                        borderRadius: '50%',
                        border: 'none',
                        background: page === pageNum ? '#e50914' : '#2f303a',
                        color: '#fff',
                        fontWeight: page === pageNum ? 'bold' : 'normal',
                        cursor: 'pointer'
                    };

                    // Show first 4 pages, last 3 pages, and current page if in between
                    if (totalPages > 8) {
                        // Show first 4 pages and last 3 pages
                        if (pageNum <= 4 || pageNum > totalPages - 3) {
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    style={PageButtonStyles}
                                >
                                    {pageNum}
                                </button>
                            );
                        }
                        // Reveal pages near the current page in the middle
                        if (
                            pageNum >= page - 1 &&
                            pageNum <= page + 1 &&
                            pageNum > 4 &&
                            pageNum <= totalPages - 3
                        ) {
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    style={PageButtonStyles}
                                >
                                    {pageNum}
                                </button>
                            );
                        }
                        // Show dots before and after the revealed middle pages
                        if (
                            pageNum === 5 &&
                            page > 6
                        ) {
                            return <span key="dots-start" style={{ margin: '0 8px', color: '#fff' }}>...</span>;
                        }
                        if (
                            pageNum === totalPages - 3 &&
                            page < totalPages - 4
                        ) {
                            return <span key="dots-end" style={{ margin: '0 8px', color: '#fff' }}>...</span>;
                        }
                        return null;
                        if (pageNum === 5) {
                            return <span key="dots" style={{ margin: '0 8px', color: '#fff' }}>...</span>;
                        }
                        return null;
                    } else {
                        // Show all pages if totalPages <= 8
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                style={PageButtonStyles}
                            >
                                {pageNum}
                            </button>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Pagination;