import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/fakeAuthContext";

function User() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  if (!user) return null;

  return (
    <div className="absolute top-10.5 right-10.5 bg-dark-1 px-3.5 py-2.5 rounded-card z-999 shadow-[0_0.8rem_2.4rem_rgba(36,42,46,0.5)] text-base font-semibold flex items-center gap-4 tablet:top-4 tablet:right-4 tablet:px-2.5 tablet:py-1.5 tablet:text-sm tablet:gap-2.5">
      <img
        src={user.avatar}
        alt={user.name}
        className="rounded-full h-10 tablet:h-7.5"
      />
      <span>Welcome, {user.name}</span>
      <button
        onClick={handleClick}
        className="bg-dark-2 rounded-card border-none px-3 py-1.5 text-inherit font-[inherit] text-xs font-bold uppercase cursor-pointer"
      >Logout</button>
    </div>
  );
}

export default User;
