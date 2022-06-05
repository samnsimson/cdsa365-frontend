import React, {
    Children,
    cloneElement,
    isValidElement,
    useEffect,
    useState,
} from 'react'
import ReactPaginate from 'react-paginate'

const Items = ({ currentItems, children }) => {
    return Children.map(children, (child) => {
        if (!isValidElement(child)) return null
        return cloneElement(child, { ...child.props, leads: currentItems })
    })
}

const PaginatedItems = ({ items, itemsPerPage, children }) => {
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(items.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(items.length / itemsPerPage))
    }, [itemOffset, itemsPerPage])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length
        const message = `User requested page number ${event.selected}, which is offset ${newOffset}`
        console.log(message)
        setItemOffset(newOffset)
    }

    return (
        <>
            <Items currentItems={currentItems} children={children} />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                className="pagination flex my-3 float-right"
            />
        </>
    )
}

export default PaginatedItems
