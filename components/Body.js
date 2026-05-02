import React, { useEffect, useState } from "react"
import useFetch from "./usefetch";

function Body() {



const  {Profile,numberofProfile,setnumofProfile,generateProfile,searchByUsername,setUsername,username,error} =useFetch();
  // Here it has been used the concept of custom hook
 
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