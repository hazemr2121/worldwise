import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
function AppLayout() {
  return (
    <div className="h-screen p-6 overscroll-y-none flex relative tablet:h-auto tablet:min-h-screen tablet:flex-col tablet:p-2.5 tablet:gap-2.5">
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
