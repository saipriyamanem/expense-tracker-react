import { memo, useContext } from "react";

import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ onEdit }) {
  const { expenses, dispatch } = useContext(ExpenseContext);

  if (expenses.length === 0) {
    return <p>No expenses yet.</p>;
  }

  return (
    <div>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          category={expense.category}
          paid={expense.paid}
          dispatch={dispatch}
          onEdit={() => onEdit(expense)}
        />
      ))}
    </div>
  );
}

export default memo(ExpenseList);
