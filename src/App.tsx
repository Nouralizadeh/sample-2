import { MantineProvider } from "@mantine/core";
// import "@mantine/core/styles.css";
import Users from "./Users";
// import "@mantine/core/styles.css";
// import "mantine-datatable/styles.css";
import { fetchUsers } from "./UserContext";



function App() {

  return (
    <MantineProvider>
        <Users  />
    </MantineProvider>
  );
}

export default App;
