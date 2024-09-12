import React from 'react';
import Survey from './components/Survey.js';
import './App.css'; // Import custom styles

const App = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-200">
      <Survey />
  </div>
    );
};

export default App;
