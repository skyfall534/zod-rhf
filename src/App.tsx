import { useState } from "react";
import "./App.css";
import { SimpleForm } from "./widgets";

function App() {
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <SimpleForm />
      <div style={{ width: "23%" }}>
        <form style={{ display: "flex", flexDirection: "column" }}>
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
      </div>
      <div style={{ width: "23%" }}>
        <form style={{ display: "flex", flexDirection: "column" }}>
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
      </div>
    </div>
  );
}

export default App;
