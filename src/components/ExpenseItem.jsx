import { Link } from "react-router-dom";

function ExpenseItem({ id, title, amount, category, paid, dispatch, onEdit }) {
  return (
    <div>
      <h3>{title}</h3>

      <p>Amount: ₹{amount}</p>

      <p>Category: {category}</p>

      <p>Paid: {paid ? "Yes" : "No"}</p>

      <Link to={`/expenses/${id}`}>View Details</Link>

      <button
        onClick={() =>
          dispatch({
            type: "DELETE_EXPENSE",
            id,
          })
        }
      >
        Delete
      </button>

      <button onClick={onEdit}>Edit</button>
    </div>
  );
}

export default ExpenseItem;
