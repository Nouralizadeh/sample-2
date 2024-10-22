import { MantineProvider } from "@mantine/core";
import Users from "./Users";



function App() {

  return (
    <MantineProvider>
        <Users  />
    </MantineProvider>
  );
}

export default App;
