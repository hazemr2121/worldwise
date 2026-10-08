import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";

function Sidebar() {
  return (
    <div className="basis-140 bg-dark-1 pt-7.5 px-12.5 pb-8.75 flex flex-col items-center h-[calc(100vh-4.8rem)] overflow-y-auto tablet:basis-auto tablet:h-auto tablet:pt-5 tablet:px-4 tablet:pb-6 tablet:rounded-card">
      <Logo />
      <AppNav />
      <Outlet />
      <footer className="mt-auto pt-5">
        <p className="text-xs text-light-1 text-center">
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
