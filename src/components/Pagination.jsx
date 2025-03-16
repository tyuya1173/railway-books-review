import "./Pagination.css"

const Pagination = ({ offset, onNext, onPrev }) => {
    return (
        <div className="book-list_pagination">
            <button
                className="book-list_pagination-btn"
                disabled={offset === 0}
                onClick={onPrev}
            >
                前へ
            </button>
            <button
                className="book-list_pagination-btn"
                onClick={onNext}
            >
                次へ
            </button>
        </div>
    );
};

export default Pagination;
