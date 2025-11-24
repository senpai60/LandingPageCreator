export default function SettingsPanel() {
  return (
    <aside className="w-72 h-full border-l bg-white p-4 space-y-6">

      <div>
        <h2 className="font-semibold mb-3">Colors</h2>
        <input type="color" className="w-full h-10 rounded border" />
      </div>

      <div>
        <h2 className="font-semibold mb-3">Typography</h2>
        <select className="w-full border p-2 rounded">
          <option>Poppins</option>
          <option>Inter</option>
          <option>Roboto</option>
          <option>Montserrat</option>
        </select>
      </div>

      <div>
        <h2 className="font-semibold mb-3">Spacing</h2>
        <input type="range" className="w-full" />
      </div>

      <div>
        <h2 className="font-semibold mb-3">Custom CSS</h2>
        <textarea
          className="w-full border p-2 rounded h-28 font-mono text-xs"
          placeholder="/* Write your custom CSS */"
        ></textarea>
      </div>

    </aside>
  );
}
