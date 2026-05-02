<<<<<<< HEAD
import React, { useEffect, useState } from "react"
import useFetch from "./usefetch";

function Body() {



const  {Profile,numberofProfile,setnumofProfile,generateProfile,searchByUsername,setUsername,username,error} =useFetch();
  // Here it has been used the concept of custom hook
 
=======
import React, { useEffect, useState } from "react";

function Body() {
  const [Profile, setProfile] = useState([]);
  const [numberofProfile, setnumofProfile] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  let rand = Math.floor(Math.random() * 10000 + 1);

  async function generateProfile(count) {
    setError("");
    const response = await fetch(
      `https://api.github.com/users?since=${rand}&per_page=${count}`
    );
    const data = await response.json();
    setProfile(data);
  }

  // 👇 New function to search by username
  async function searchByUsername() {
    if (!username.trim()) return;
    setError("");

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      setError(`User "${username}" not found.`);
      setProfile([]);
      return;
    }

    const data = await response.json();
    // Wrap in array so existing .map() still works
    setProfile([data]);
  }

  useEffect(() => {
    generateProfile(10);
  }, []);

>>>>>>> 8abce0aad2885565fceca1c7c0a07e2e18e7d474
  return (
    <>
      {/* Existing random profile generator */}
      <div className="but">
        <input
          className="inpu"
          type="text"
          placeholder="Number of profiles"
          value={numberofProfile}
          onChange={(e) => setnumofProfile(e.target.value)}
        />
        <button onClick={() => generateProfile(Number(numberofProfile))}>
          Search Profile
        </button>
      </div>

      {/* 👇 New username search bar */}
      <div className="but">
        <input
          className="inpu"
          type="text"
          placeholder="Search by GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchByUsername()}
        />
        <button onClick={searchByUsername}>Search User</button>
      </div>

      {/* Error message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="profiles">
        {Profile.map((value) => (
          <div key={value.id} className="Cards">
            <img src={value.avatar_url} alt={value.login} />
            <h2>{value.login}</h2>
            <button className="Pro-but">
              <a href={value.html_url} target="_blank" rel="noreferrer">
                Go to Profile
              </a>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Body;