import { useEffect, useReducer, useState } from "react";

import { useSearchParams, Outlet } from "react-router-dom";

import ExpenseTitle from "../components/ExpenseTitle";

import ExpenseForm from "../components/ExpenseForm";

import ExpenseList from "../components/ExpenseList";

import { ExpenseContext, expenseReducer } from "../context/ExpenseContext";

function Expenses() {
  const [editingExpense, setEditingExpense] = useState(null);

  const [expenses, dispatch] = useReducer(expenseReducer, [], () => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const filter = searchParams.get("filter");

  let filteredExpenses = expenses;

  if (filter === "pending") {
    filteredExpenses = expenses.filter((expense) => !expense.paid);
  }

  if (filter === "paid") {
    filteredExpenses = expenses.filter((expense) => expense.paid);
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === category,
    );
  }

  function addExpense(newExpense) {
    dispatch({
      type: "ADD_EXPENSE",
      expense: newExpense,
    });
  }

  function updateExpense(updatedExpense) {
    dispatch({
      type: "UPDATE_EXPENSE",
      expense: updatedExpense,
    });

    setEditingExpense(null);
  }

  // Expense calculations
  const totalAmount = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const paidAmount = expenses
    .filter((expense) => expense.paid)
    .reduce((total, expense) => total + Number(expense.amount), 0);

  const pendingAmount = totalAmount - paidAmount;

  function showAll() {
    setSearchParams({});
  }

  function showPaid() {
    setSearchParams({ filter: "paid" });
  }

  function showPending() {
    setSearchParams({ filter: "pending" });
  }

  function showCategory(categoryName) {
    setSearchParams({ category: categoryName });
  }

  return (
    <main>
      <ExpenseTitle />

      <div>
        <h1>Expenses</h1>
        <Outlet />
      </div>

      <p>Total expenses: {expenses.length}</p>

      <p>Total amount: ₹{totalAmount}</p>

      <p>Paid amount: ₹{paidAmount}</p>

      <p>Pending amount: ₹{pendingAmount}</p>

      <div>
        <button onClick={showAll}>All</button>

        <button onClick={showPaid}>Paid</button>

        <button onClick={showPending}>Pending</button>

        <button onClick={() => showCategory("Food")}>Food</button>

        <button onClick={() => showCategory("Travel")}>Travel</button>

        <button onClick={() => showCategory("Shopping")}>Shopping</button>

        <button onClick={() => showCategory("Education")}>Education</button>

        <button onClick={() => showCategory("Other")}>Other</button>
      </div>

      <ExpenseForm
        onAddExpense={addExpense}
        editingExpense={editingExpense}
        onUpdateExpense={updateExpense}
      />

      <ExpenseContext.Provider value={{ expenses: filteredExpenses, dispatch }}>
        <ExpenseList onEdit={setEditingExpense} />
      </ExpenseContext.Provider>
    </main>
  );
}

export default Expenses;
