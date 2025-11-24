import { useElementContext } from "../context/ElementCreateContext";
import { cssCategories } from "../utils/cssUpdater";

export default function SettingsPanel() {
  const { selectedId, elements, updateElement } = useElementContext();

  if (!elements || Object.keys(elements).length === 0) {
    return (
      <aside className="w-80 h-full border-l bg-white p-6 flex items-center justify-center text-center">
        <p className="text-gray-400 text-sm">Add elements to start.</p>
      </aside>
    );
  }

  if (!selectedId || !elements[selectedId]) {
    return (
      <aside className="w-80 h-full border-l bg-white p-6 flex items-center justify-center text-center">
        <p className="text-gray-400 text-sm">Select an element to edit.</p>
      </aside>
    );
  }

  const selectedElement = elements[selectedId];
  const currentStyles = selectedElement.styles || {};

  // --- HANDLERS ---
  
  // 1. Handle Style Changes (CSS)
  const handleStyleChange = (property, value) => {
    const newStyles = { ...currentStyles, [property]: value };
    updateElement(selectedId, { styles: newStyles });
  };

  // 2. Handle Content Changes (Text / Image Src)
  const handleContentChange = (e) => {
    updateElement(selectedId, { content: e.target.value });
  };

  const handleSrcChange = (e) => {
    updateElement(selectedId, { props: { ...selectedElement.props, src: e.target.value } });
  };

  // --- VISIBILITY LOGIC ---
  const isPropertyVisible = (prop) => {
    const d = currentStyles.display;
    const p = currentStyles.position;
    if (["flexDirection", "justifyContent", "alignItems", "alignContent", "flexWrap", "gap"].includes(prop)) return d === "flex" || d === "inline-flex";
    if (["gridTemplateColumns", "gridTemplateRows", "columnGap", "rowGap", "justifyItems"].includes(prop)) return d === "grid" || d === "inline-grid";
    if (["top", "right", "bottom", "left"].includes(prop)) return p === "absolute" || p === "fixed" || p === "relative";
    return true;
  };

  return (
    <aside className="w-80 h-full border-l bg-white flex flex-col overflow-y-auto shadow-xl z-20">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-gray-700 uppercase">Inspector</h2>
          <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-mono">
            {selectedElement.type}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* --- NEW: CONTENT EDITOR SECTION --- */}
        <div className="border-b pb-6">
          <h3 className="text-xs font-bold text-gray-900 uppercase mb-3">Properties</h3>
          
          {/* Show Image URL Input if it's an Image */}
          {selectedElement.type === "img" ? (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-gray-500">Image Source (URL)</label>
              <input
                type="text"
                value={selectedElement.props?.src || ""}
                onChange={handleSrcChange}
                className="w-full text-xs p-2 border rounded bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-colors"
                placeholder="https://..."
              />
            </div>
          ) : (
            /* Show Text Area for everything else (except root) */
            selectedElement.id !== "root" && (
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-500">Text Content</label>
                <textarea
                  rows={3}
                  value={selectedElement.content || ""}
                  onChange={handleContentChange}
                  className="w-full text-xs p-2 border rounded bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-colors resize-none"
                  placeholder="Type here..."
                />
              </div>
            )
          )}
        </div>

        {/* --- CSS STYLES SECTION --- */}
        {cssCategories.map((category) => (
          <div key={category.title} className="border-b pb-4 last:border-0 last:pb-0">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
              {category.title}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {category.items
                .filter((item) => isPropertyVisible(item.prop))
                .map((item) => (
                  <div
                    key={item.prop}
                    className={`flex flex-col ${item.type === "color" ? "col-span-1" : "col-span-2"}`}
                  >
                    <label className="text-[11px] text-gray-500 font-medium mb-1 truncate" title={item.label}>
                      {item.label}
                    </label>

                    {item.type === "select" ? (
                      <select
                        value={currentStyles[item.prop] || ""}
                        onChange={(e) => handleStyleChange(item.prop, e.target.value)}
                        className="w-full text-xs p-2 border rounded bg-white focus:border-blue-500 outline-none"
                      >
                        <option value="">Default</option>
                        {item.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : item.type === "color" ? (
                      <div className="flex items-center gap-2 border rounded p-1">
                        <input
                          type="color"
                          value={currentStyles[item.prop] || "#ffffff"}
                          onChange={(e) => handleStyleChange(item.prop, e.target.value)}
                          className="w-6 h-6 border-0 rounded cursor-pointer p-0"
                        />
                        <span className="text-[10px] text-gray-400 font-mono flex-1">
                          {currentStyles[item.prop] || "None"}
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder={item.placeholder || "auto"}
                        value={currentStyles[item.prop] || ""}
                        onChange={(e) => handleStyleChange(item.prop, e.target.value)}
                        className="w-full text-xs p-2 border rounded focus:border-blue-500 outline-none"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}