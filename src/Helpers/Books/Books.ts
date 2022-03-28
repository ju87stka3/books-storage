export  const showAuthors = (item: string | string[]) => {
    if (!item) {
      return;
    }
    let text: string | string[];
    item === "string"
      ? (text = "Author: " + item)
      : Array.isArray(item)
      ? (text = "Authors: " + item?.join(","))
      : (text = "Author: " + item);

    return text;
  };