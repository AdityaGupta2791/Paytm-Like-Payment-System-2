import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-blue-600 mb-2">404</h1>
          <Heading label={"Page Not Found"} />
        </div>
        
        <SubHeading label={"Sorry, the page you're looking for doesn't exist. Let's get you back to the main page."} />
        
        <div className="mt-8">
          <Link to="/">
            <Button label={"Go to Home"} />
          </Link>
        </div>
      </div>
    </div>
  );
}