import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real auth call
    console.log("logging in:", { email, password });
    navigate("/account/my");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-darker">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-primary-foreground">
          Log in to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-accent-foreground py-2 rounded hover:opacity-90 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-foreground mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-accent hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;