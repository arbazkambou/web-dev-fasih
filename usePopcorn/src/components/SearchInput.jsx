import { useEffect, useRef } from "react";

function SearchInput({ query, setQuery }) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    // const searchInput = document.querySelector(".search");
    // searchInput.focus();
    searchInputRef.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInputRef}
    />
  );
}

export default SearchInput;
