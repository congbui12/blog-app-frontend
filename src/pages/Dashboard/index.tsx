import { NavLink, Outlet } from 'react-router-dom';
import Layout from '../../components/layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <NavLink
            to="/dashboard"
            end // 'end' ensures this is only active on the exact /dashboard path
            className={({ isActive }) =>
              `pb-2 px-1 ${isActive ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`
            }
          >
            Personal Posts
          </NavLink>
          <NavLink
            to="/dashboard/favorites"
            className={({ isActive }) =>
              `pb-2 px-1 ${isActive ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`
            }
          >
            Favorites
          </NavLink>
        </div>

        <Outlet />
      </div>
    </Layout>
  );
};

export default Dashboard;
