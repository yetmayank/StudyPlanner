import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ScheduleManager from './pages/ScheduleManager';
import TaskTracker from './pages/TaskTracker';
import AISchedule from './pages/AISchedule';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<ScheduleManager />} />
            <Route path="/tasks" element={<TaskTracker />} />
            <Route path="/ai-schedule" element={<AISchedule />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;