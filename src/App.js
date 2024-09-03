import React from 'react';
import UserTable from './components/userTable';

function App() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-8 bg-stone-50">
        <h1 className="text-3xl font-semibold mb-8">All Members</h1>
        <UserTable />
      </div>
    </div>
  );
}

export default App;
