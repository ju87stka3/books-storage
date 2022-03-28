import React, { useState } from "react";
import "./Books.css";
import { useFetch } from "../../Hooks/useFetch";
import { getAllBooks } from "../../Api/Books";
import { IBook } from "../../Type/IBooks";
import Book from "../../Components/Book";
import Error from "../../Components/Error";

function Books() {
  const [data, loading, error] = useFetch<IBook[]>(getAllBooks);

  const [open, setOpen] = useState<IBook | null>(null);

  return (
    <div className="Books">
      <div className="Books__wrapper">
        <p>On this page you see a list of books</p>
        {loading && <p>Loading</p>}
        {!!data?.length && !loading
          ? data?.map((item) => (
              <Book key={item?.id} item={item} open={open} setOpen={setOpen} />
            ))
          : !loading && <p>Nothing to show</p>}
        {!!error && <Error message={error} />}
      </div>
    </div>
  );
}

export default Books;
