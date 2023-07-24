import { useEffect, useState } from 'react';

function App() {
  const [todo, setTodo] = useState({ id: '', title: '', description: '' });
  const [result, setResult] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:7000/todos', {
        method: 'GET',
      });
      const json = await response.json();
      setResult(json);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:7000/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => console.log('success', res));
    fetchData();
    console.log('inputs', todo);
  };
  const tableItems = () => {
    return (
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th className="px-6 py-4" key="1">
              Title
            </th>
            <th key="2">Description</th>
          </tr>
        </thead>
        <tbody>
          {result?.map((rowvalue) => {
            return (
              <tr key={rowvalue?.title}>
                <td key={rowvalue?.id}>{rowvalue?.title}</td>
                <td
                  key={rowvalue?.description + rowvalue?.id + rowvalue?.title}
                >
                  {rowvalue?.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div>
        <form>
          <label htmlFor="title">Title: </label>
          <input
            className="border-2 rounded-xl border-orange-300"
            type="text"
            value={todo.title}
            onChange={handleChange}
            name="title"
            id="title"
          />
          <br />
          <br />
          <label htmlFor="description">Description: </label>
          <input
            className="border-2 rounded-xl border-orange-300"
            type="text"
            value={todo.description}
            onChange={handleChange}
            name="description"
            id="description"
          />
          <br />
          <br />
          <button
            className="border-2 rounded-lg text-lime-500 border-orange-300 "
            onClick={handleSubmit}
            type="submit"
          >
            Add Item
          </button>
        </form>
      </div>
      {tableItems()}
    </>
  );
}

export default App;
