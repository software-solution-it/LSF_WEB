import { useEffect, useState } from 'react';
import { useUser, User } from './store/user';
import './App.css'

function App() {

  const getAllUser = useUser((state) => state.getAllUser);
  const addToUser = useUser((state) => state.addToUser);
  const currentUser = useUser((state) => state.users);
  const [variosUsers, setVariosUsers] = useState<User[]>([]);


  useEffect(() => {
    console.log("UseEffect!");
    const fetchUserData = async () => {
      await addToUser(103);
    };

    const fetchGetAll = async () => {
      console.log("fetchGetAll");
      var response = await getAllUser();
      console.table(response);
      setVariosUsers(response);
    };

    fetchUserData();
    fetchGetAll();
  }, []);

  const handleClick = (id: number): React.MouseEventHandler<HTMLButtonElement> => async (event) => {
    try {
      // Perform asynchronous operation here
      await addToUser(id); // Assuming addToUser is an asynchronous function
      // Handle success or update UI
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <p>Teste vite</p>
      <form action="">
        <label htmlFor="numericInput">Enter a number:</label>
        <input type="number" id="numericInput" name="numericInput" />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleClick(105)}>getAllUser</button>
      <h1>ID: {currentUser?.id}</h1>
      <h1>NAME: {currentUser?.name}</h1>
      <h1>EMAIL: {currentUser?.email}</h1>
      <h1>PASSWORD: {currentUser?.password}</h1>
      <h1>PHONE: {currentUser?.phone}</h1>

      <ul>
        {variosUsers.map((user, index) => (
          <li key={index}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
