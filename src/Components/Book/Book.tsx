import React, { memo } from "react";
import "./Book.css";
import { IBook } from "../../Type/IBooks";
import { useNavigate } from "react-router-dom";
import ShowAuthors from "../ShowAuthors";
const Book = ({
  item,
  open,
  setOpen,
}: {
  item: IBook;
  open: IBook | null;
  setOpen: React.Dispatch<React.SetStateAction<IBook | null>>;
}) => {
  let navigate = useNavigate();

  const handleClickOnBook = () => {
    item?.id === open?.id ? setOpen(null) : setOpen(item);
  };
  const buttonHandleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.stopPropagation();
    navigate("/books/" + item?.id);
  };
  const handleClickOnLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <div className="Book" onClick={handleClickOnBook}>
        <div className="Book__left">
          <p>Title: {item?.title || "No title"}</p>
          <p>Year: {item?.year || "No year"}</p>
        </div>
        <div className="Book__right">
          <a href={item?.wiki_url} onClick={handleClickOnLink}>
            {"Link for wiki"}
          </a>
          <p>Id: {item?.id || "No id"}</p>
          <button onClick={buttonHandleClick}>Open in additional page</button>
        </div>
      </div>
      <ShowAuthors item={item} open={open} />
    </React.Fragment>
  );
};
export default memo(Book);
