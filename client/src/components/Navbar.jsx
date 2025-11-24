export default function Navbar() {
  return (
    <nav className="w-full h-14 bg-white border-b flex items-center justify-between px-6">
      <div className="text-xl font-semibold">LandingBuilder</div>

      <div className="flex items-center gap-6 text-sm">
        <button className="hover:text-blue-600">Templates</button>
        <button className="hover:text-blue-600">Components</button>
        <button className="hover:text-blue-600">Preview</button>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Export
        </button>
      </div>
    </nav>
  );
}
