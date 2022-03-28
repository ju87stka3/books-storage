import React, { useCallback } from "react";
import "./OneBook.css";
import { useFetch } from "../../Hooks/useFetch";
import { getBookById } from "../../Api/Books";
import { IBook } from "../../Type/IBooks";
import Error from "../../Components/Error";
import { Navigate, useParams } from "react-router-dom";
import { showAuthors } from "../../Helpers/Books/Books";

function Books() {
  const { id } = useParams();

  const api = useCallback(() => getBookById(id || "1"), [id]);
  const [dataSingle, loadingSingle, errorSingle] = useFetch<IBook>(api);
  if (!id) return <Navigate to="/books" />;
  return (
    <div className="One-book">
      <div className="One-book__wrapper">
        <p>On this page you see a list of books</p>
        {loadingSingle && <p>Loading</p>}
        <p>Full information about movie</p>
        {!dataSingle && <p>Data is empty</p>}
        {!!dataSingle && Object?.entries(dataSingle)?.length && (
          <div className="One-book__information">
            <p>Title: {dataSingle?.title || "No title"}</p>
            <p>Year: {dataSingle?.year || "No year"}</p>
            <a href={dataSingle?.wiki_url}>{"Link for wiki"}</a>
            <p>Id: {dataSingle?.id || "No id"}</p>
            <p>{showAuthors(dataSingle?.author)}</p>
          </div>
        )}
        {!!errorSingle && <Error message={errorSingle} />}
      </div>
    </div>
  );
}

export default Books;
