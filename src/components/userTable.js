import React, { useState, useEffect } from "react";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      });
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchText, selectedCity, selectedGender]);

  const filterUsers = () => {
    const filtered = users.filter((user) => {
      const matchesName =
        user.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchText.toLowerCase());
      const matchesCity = selectedCity === "" || user.city === selectedCity;
      const matchesGender =
        selectedGender === "" || user.gender === selectedGender;

      return matchesName && matchesCity && matchesGender;
    });
    setFilteredUsers(filtered);
  };

  const getAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  return (
    <div>
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded-lg p-2 w-[25vw]"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-[18vw]"
        >
          <option value="">City</option>
          {Array.from(new Set(users.map((user) => user.city))).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-[18vw]"
        >
          <option value="">Filter by gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-stone-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Mobile</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Age</th>
            <th className="py-2 px-4 text-left">Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-stone-100" : "bg-stone-200"
              } rounded-lg`}
            >
              <td className="py-2 px-4 mt-2">{`${user.firstname} ${user.lastname}`}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.mobile}</td>
              <td className="py-2 px-4">{`${user.city}, ${user.state} ${user.pincode}`}</td>
              <td className="py-2 px-4">{getAge(user.dateOfBirth)}</td>
              <td className="py-2 px-4">{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
