import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  return (
    <div>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input></input>
      </form>
      <div></div>
      <div></div>
    </div>
  );
}

export default App;
