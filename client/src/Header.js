import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">HackDevs</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link to="/developers">Developers</Link>
            <Link to="/hackathons">Hackathons</Link>
            <Link to="/chatroom">Chat Room</Link>
            <Link to="/taskmanagement">Tasks</Link>
            <a href="/" onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/hackathons">Hackathons</Link>
            <Link to="/developers">Developers</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/About">About</Link>
          </>
        )}
      </nav>
    </header>
  );
}
