export default function CodePanel() {
  return (
    <div className="w-full h-52 border-t bg-gray-900 text-white p-4">
      <div className="flex gap-4 mb-3">
        <button className="px-3 py-1 bg-gray-700 rounded">HTML</button>
        <button className="px-3 py-1 bg-gray-700 rounded">CSS</button>
        <button className="px-3 py-1 bg-gray-700 rounded">Tailwind</button>
      </div>

      <pre className="text-xs opacity-70">
        {/* Live code will render here later */}
        {"// Live generated code will appear here"}
      </pre>
    </div>
  );
}
