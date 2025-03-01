"use client";
import React from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

export function Pagination(props: ReactPaginateProps) {
  return (
    <ReactPaginate
      {...props}
      breakLabel="..."
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      previousLabel={
        <div className="pagination_el rotate-180">
          <button className="pagination_el_arrow">{">"}</button>
        </div>
      }
      nextLabel={
        <div className="pagination_el">
          <button className="pagination_el_arrow">{">"}</button>
        </div>
      }
      renderOnZeroPageCount={null}
      className="mt-4 flex justify-center gap-2"
      activeClassName="!text-blue-500 !border-blue-500 font-[500]"
      pageClassName="pagination_el"
      disabledClassName="pagination_el_disabled"
    />
  );
}
