export default function AdminUsers() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage students, teachers, institutions, and staff access.</p>
        </div>
        <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Invite User
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-800 bg-gray-950/50 flex gap-4">
          <input 
            type="text" 
            placeholder="Search users by name, email, or institution..." 
            className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-green-500"
          />
          <select className="bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 text-sm focus:outline-none focus:border-green-500">
            <option>All Roles</option>
            <option>Student</option>
            <option>Teacher</option>
            <option>Institution Admin</option>
            <option>Staff</option>
          </select>
        </div>

        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-950/80 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">User Details</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Institution</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            <tr className="hover:bg-gray-800/30 transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-white">Rahim Islam</div>
                <div className="text-xs text-gray-500">rahim@example.com</div>
              </td>
              <td className="px-6 py-4">Student</td>
              <td className="px-6 py-4 text-gray-400">Dhaka College</td>
              <td className="px-6 py-4"><span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded">Active Pro</span></td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-white font-medium">Manage</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-800/30 transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-white">Dr. Selim Rahman</div>
                <div className="text-xs text-gray-500">s.rahman@ndc.edu.bd</div>
              </td>
              <td className="px-6 py-4">Teacher</td>
              <td className="px-6 py-4 text-gray-400">Notre Dame College</td>
              <td className="px-6 py-4"><span className="text-blue-400 text-xs bg-blue-400/10 px-2 py-1 rounded">Institution Seat</span></td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-white font-medium">Manage</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-800/30 transition-colors bg-red-900/10">
              <td className="px-6 py-4">
                <div className="font-medium text-white">Suspended Account</div>
                <div className="text-xs text-gray-500">baduser@example.com</div>
              </td>
              <td className="px-6 py-4">Student</td>
              <td className="px-6 py-4 text-gray-400">-</td>
              <td className="px-6 py-4"><span className="text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded">Suspended</span></td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-white font-medium">Manage</button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="p-4 border-t border-gray-800 bg-gray-950/50 flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 to 3 of 12,450 users</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 bg-gray-900 rounded border border-gray-700 hover:bg-gray-800">Prev</button>
            <button className="px-2 py-1 bg-gray-900 rounded border border-gray-700 hover:bg-gray-800">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
