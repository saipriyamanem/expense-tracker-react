import { useNavigate, useParams } from "react-router-dom";

function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Expense Details</h1>
      <p>Expense ID: {id}</p>

      <button onClick={() => navigate("/expenses")}>Back to Expenses</button>
    </div>
  );
}

export default ExpenseDetails;
