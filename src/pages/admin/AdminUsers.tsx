
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', date: '2023-05-15', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', date: '2023-06-22', status: 'active' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', date: '2023-07-10', status: 'active' },
  { id: 4, name: 'Bob Williams', email: 'bob.williams@example.com', date: '2023-08-05', status: 'inactive' },
  { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', date: '2023-09-18', status: 'active' },
  { id: 6, name: 'Diana Miller', email: 'diana.miller@example.com', date: '2023-10-03', status: 'active' },
  { id: 7, name: 'Edward Davis', email: 'edward.davis@example.com', date: '2023-11-12', status: 'inactive' },
  { id: 8, name: 'Fiona Wilson', email: 'fiona.wilson@example.com', date: '2023-12-01', status: 'active' }
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-8">
            <Link to="/admin" className="inline-flex items-center text-sm font-medium hover:underline">
              <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 md:mb-0">Manage Users</h1>
            
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(user.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminUsers;
