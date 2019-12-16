import fetch from "node-fetch";

export const getCoverImage = (isbn: string): Promise<string> => {
  return fetch(
    "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "key",
    { method: "get" }
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      const img = data.items[0].volumeInfo.imageLinks.thumbnail;
      console.log(img);
      return img;
    });
};
