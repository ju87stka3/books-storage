import React, { memo, useEffect, useState } from "react";
import "./Error.css";
const Error = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 7000);
    setOpen(true);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <div className={open ? "Error__show Error" : "Error__close Error"}>
      <p>{message}</p>
    </div>
  );
};
export default memo(Error);
