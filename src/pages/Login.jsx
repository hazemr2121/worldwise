import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/fakeAuthContext";
import { DEMO_USER } from "../constants/demo";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const rowClass = "flex flex-col gap-1.25";

export default function Login() {
  const { login, isAuthenticated, error } = useAuth();
  // Pre-filled so a visitor can get straight into the demo.
  const [email, setEmail] = useState(DEMO_USER.email);
  const [password, setPassword] = useState(DEMO_USER.password);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <main className="m-6.25 px-12.5 py-6.25 bg-dark-1 min-h-[calc(100vh-5rem)] phone:m-2.5 phone:px-3.75 phone:py-5 phone:min-h-[calc(100vh-2rem)]">
      <PageNav />

      <form className="bg-dark-2 rounded-card p-7.5 flex flex-col gap-5 w-120 max-w-full my-20 mx-auto phone:my-10 phone:p-5" onSubmit={handleSubmit}>
        <p className="text-sm leading-normal text-dark-1 bg-brand-2 rounded-control px-3.5 py-2.5 mb-1.25">
          This is a demo — the credentials are already filled in, just press
          Login.
        </p>

        <div className={rowClass}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={rowClass}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {error && (
          <p className="text-[1.5rem] font-semibold text-brand-1" role="alert">
            {error}
          </p>
        )}

        <div className="flex justify-end">
          <Button type="primary" nativeType="submit">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
