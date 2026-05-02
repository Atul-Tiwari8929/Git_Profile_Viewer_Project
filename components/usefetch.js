 
 import {useState,useEffect} from  "react";

 
   function useFetch(){

    
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
    setProfile(data);   // these state  variables re renders the body component not useFetch because it self is being called by body
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
    generateProfile(10);  // useeffect sabse last me execute hota hai
  }, []);



  return {
    Profile,numberofProfile,setnumofProfile,generateProfile,searchByUsername,setUsername,username,error
  }

  



   }
 
export default useFetch