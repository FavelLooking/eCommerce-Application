import React from 'react';
import './popup.scss';

type PopUpProps = {
  message: string;
  onYes: Function;
  onNo: Function;
};

export default function PopUp(props: PopUpProps) {
  const { message, onYes, onNo } = props;

  return (
    <div className={` popup-window flex flex-column`}>
      <span className="popup-text">{message}</span>
      <div className="flex popup-flex">
        <input
          type="button"
          className="popup-button"
          value="Yes"
          onClick={onYes()}
        />
        <input
          type="button"
          className="popup-button"
          value="No"
          onClick={onNo()}
        />
      </div>
    </div>
  );
}
