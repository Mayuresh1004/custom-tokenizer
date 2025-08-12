export default function InputBox({
  label,
  value,
  onChange,
  disabled = false,
  placeholder = ""
}) {
  return (
    <div className="bg-white p-3 rounded-lg flex flex-col">
      <label className="text-sm mb-1 text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
