import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <div className="p-2">
      <h2>404 — Page not found</h2>
      <p>Go to <Link to="/signin" >/signin</Link></p>
    </div>
  );
}