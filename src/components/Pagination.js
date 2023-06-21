import React from 'react';
import './Pagination.css';

const Pagination = ({dataLength, rowsPerPage, setCurrentPage}) => {
    let pages=[];
    // console.log(dataLength);

    for (let index = 1; index <= Math.ceil(dataLength/rowsPerPage); index++) {
        pages.push(index)
    }
    return (
        <div className='pagnationComponent'>
            <button className='pageButtons' onClick={()=> setCurrentPage(1)}>F</button>
            {
                pages.map((pageNumber, index) => {
                    return <button className='pageButtons' key={index} onClick={()=> setCurrentPage(pageNumber)}>{pageNumber}</button>
                })
            }
            <button className='pageButtons' onClick={()=> setCurrentPage(pages.length)}>L</button>
        </div>
    );

}

export default Pagination;