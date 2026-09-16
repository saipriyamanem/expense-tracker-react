import { useEffect, useState } from "react";

function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paid, setPaid] = useState(false);
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setPaid(editingExpense.paid);
      setPriority(editingExpense.priority);
      setDescription(editingExpense.description);
    }
  }, [editingExpense]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title || !amount || !category) {
      alert("Please fill all required fields");
      return;
    }

    const expense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      title,
      amount,
      category,
      paid,
      priority,
      description,
    };

    if (editingExpense) {
      onUpdateExpense(expense);
    } else {
      onAddExpense(expense);
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setPaid(false);
    setPriority("Medium");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Expense title"
      />

      <input
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="Amount"
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Education">Education</option>
        <option value="Other">Other</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={paid}
          onChange={(event) => setPaid(event.target.checked)}
        />
        Paid
      </label>

      <p>Priority:</p>

      <label>
        <input
          type="radio"
          name="priority"
          value="Low"
          checked={priority === "Low"}
          onChange={(event) => setPriority(event.target.value)}
        />
        Low
      </label>

      <label>
        <input
          type="radio"
          name="priority"
          value="Medium"
          checked={priority === "Medium"}
          onChange={(event) => setPriority(event.target.value)}
        />
        Medium
      </label>

      <label>
        <input
          type="radio"
          name="priority"
          value="High"
          checked={priority === "High"}
          onChange={(event) => setPriority(event.target.value)}
        />
        High
      </label>

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
      />

      <button type="submit">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
