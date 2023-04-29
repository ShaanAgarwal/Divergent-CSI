import {useState} from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [about, setAbout] = useState('');
  const [github, setGitHub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username, email, age, contact, about, github, linkedin, password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="Username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="email"
             placeholder="Email"
             value={email}
             onChange={ev => setEmail(ev.target.value)}/>
      <input type="number"
             placeholder="Age"
             value={age}
             onChange={ev => setAge(ev.target.value)}/>
      <input type="number"
             placeholder="Contact Number"
             value={contact} 
             onChange={ev => setContact(ev.target.value)}/>
      <input type="text"
             placeholder="About"
             value={about}
             onChange={ev => setAbout(ev.target.value)}/>
      <input type="text"
             placeholder="GitHub Link"
             value={github}
             onChange={ev => setGitHub(ev.target.value)}/>
      <input type="text"
             placeholder="Linkedin Link"
             value={linkedin}
             onChange={ev => setLinkedin(ev.target.value)}/>
      <input type="password"
             placeholder="Password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
  );
}