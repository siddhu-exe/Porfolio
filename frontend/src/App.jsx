import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import FrameLines from './components/FrameLines.jsx';
import PageTransitionProvider from './components/PageTransition.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';

export default function App() {
  return (
    <PageTransitionProvider>
      <SmoothScroll />
      <FrameLines />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </PageTransitionProvider>
  );
}
