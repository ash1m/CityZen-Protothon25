import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { PollsSection } from './components/PollsSection';
import { IssuesSection } from './components/IssuesSection';
import { CommunitiesSection } from './components/CommunitiesSection';
import { TopIssuesSection } from './components/TopIssuesSection';
import { NavigationBar } from './components/NavigationBar';
import { IssuePage } from './components/IssuePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-4 pb-20">
              <PollsSection />
              <IssuesSection 
                title="Issues Raised by You" 
                count={3} 
              />
              <CommunitiesSection />
              <TopIssuesSection />
            </main>
            <NavigationBar />
          </div>
        } />
        <Route path="/issues/:id" element={<IssuePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;