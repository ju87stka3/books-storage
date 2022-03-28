import { memo, useRef } from "react";
import { showAuthors } from "../../Helpers/Books/Books";
import { IBook } from "../../Type/IBooks";
import "./ShowAuthors.css";

const ShowAuthors = ({ item, open }: { item: IBook; open: IBook | null }) => {
  const contentEl = useRef<any>();

  return (
    <>
      <div
        ref={contentEl}
        style={
          !!open && !!Object?.entries(open)?.length && open?.id === item?.id
            ? {
                height: contentEl?.current?.scrollHeight,
                borderBottom: "1px solid",
              }
            : { height: "0px", borderBottom: "none" }
        }
        className="Book__authors"
      >
        <p>{showAuthors(item?.author)}</p>
      </div>
    </>
  );
};
export default memo(ShowAuthors);
