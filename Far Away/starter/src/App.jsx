import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  // function handleSort(e) {
  //   console.log("sort", e.targ.value);
  // }

  function handleStatus(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleStatus={handleStatus}
        handleDelete={handleDelete}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ handleAddItem }) {
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const item = {
      quantity,
      description,
      id: Date.now(),
      isPacked: false,
    };

    handleAddItem(item);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 21 }, (_, index) => index + 1).map(
          (item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          )
        )}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handleStatus, handleDelete }) {
  const [sortBy, setSortBy] = useState("");

  let sortedItems = items;

  if (sortBy === "input") return sortedItems;

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.isPacked) - Number(b.isPacked));
  }

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, index) => (
          <Item
            item={item}
            key={index}
            handleStatus={handleStatus}
            handleDelete={handleDelete}
          />
        ))}
      </ul>

      <div className="action">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="input">Sort by input number</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, handleStatus, handleDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.isPacked}
        onChange={() => handleStatus(item.id)}
      />
      <span style={item.isPacked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        💼 You have $NumOfItems items on your list, and you already packed $
        $NumOfItemsPacked $percentage
      </em>
    </footer>
  );
}

export default App;
