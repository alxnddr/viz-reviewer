import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Home } from './screens/Home';
import { Settings } from './screens/Settings';

const theme = createTheme({});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
