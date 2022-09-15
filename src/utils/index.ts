export const getUrl = () =>
  process.env.NODE_ENV === "production"
    ? ""
    : `http://localhost:${process.env.PORT || 3333}`;
