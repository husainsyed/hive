import React from 'react';
import Dropdown from './Dropdown';

const App = () => {
  const options = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Josh Knutson'];

  return (
    <div>
      <Dropdown options={options}/>
    </div>
  );
};

export default App;
