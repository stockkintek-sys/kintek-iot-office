export default function DeviceCard({ name, state, onToggle }) {
  const isOn = state === "ON";

  return (
    <div className={`device-card ${isOn ? "on" : "off"}`}>
      <div className="device-icon">💡</div>
      <h3>{name}</h3>
      <p className="status">{isOn ? "ON" : "OFF"}</p>

      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={onToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
}
