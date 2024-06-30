'use client';

import { useEffect, useState } from 'react';

function Home() {
  const [permissions, setPermissions] = useState<{ name: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/permission')
      .then((res) => res.json())
      .then((data) => {
        setPermissions(data.data);
      });
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {permissions.map((permission) => (
          <li key={permission.name}>{permission.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
