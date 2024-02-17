import {RecentvisitorOrders, Stats } from "../../components";

const Dashboard = () => {
  return (
    <div className="px-8 py-4 flex flex-col gap-y-8">
      <Stats />
      <RecentvisitorOrders/>
    </div>
  );
};

export default Dashboard;
