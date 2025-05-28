import '../styles/switch.css';

const Switch = ({ isChecked, onChange, id }) => {
  return (
    <label className="switch">
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={onChange}
        id={id}
      />
      <span className="switch-slider"></span>
    </label>
  );
};

export default Switch;