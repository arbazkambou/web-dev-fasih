import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
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

    setItems((items) => [...items, item]);
    setQuantity(0);
    setDescription([]);
  }

  function handleQuantity(e) {
    setQuantity(() => e.target.value);
  }

  function handleDescription(e) {
    setDescription(() => e.target.value);
  }

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
      <Form
        handleSubmit={handleSubmit}
        handleQuantity={handleQuantity}
        handleDescription={handleDescription}
        quantity={quantity}
        description={description}
      />
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

function Form({
  handleSubmit,
  handleDescription,
  handleQuantity,
  quantity,
  description,
}) {
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={handleQuantity}>
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
        onChange={handleDescription}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, handleStatus, handleDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item, index) => (
          <Item
            item={item}
            key={index}
            handleStatus={handleStatus}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleStatus, handleDelete }) {
  console.log("item", item);
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
