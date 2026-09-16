import { createContext } from "react";

const ExpenseContext = createContext();

function expenseReducer(state, action) {
  if (action.type === "ADD_EXPENSE") {
    return [...state, action.expense];
  }

  if (action.type === "DELETE_EXPENSE") {
    return state.filter((expense) => expense.id !== action.id);
  }

  if (action.type === "UPDATE_EXPENSE") {
    return state.map((expense) =>
      expense.id === action.expense.id ? action.expense : expense,
    );
  }
  return state;
}

export { ExpenseContext, expenseReducer };
