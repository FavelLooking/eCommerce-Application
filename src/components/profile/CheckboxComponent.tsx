import React, { useState } from 'react';

function CheckBoxComponent() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <input
        type="checkbox"
        className="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}

export default CheckBoxComponent;
