// client/src/components/SettingsPanel.jsx
import { useStyleContext } from "../context/StyleContext";
import { useElementContext } from "../context/ElementCreateContext";
import { cssCategories } from "../utils/cssUpdater";

export default function SettingsPanel() {
  const { selectedElementId, updateStyle, getStyle } = useStyleContext();
  const { elements } = useElementContext();

  // 1. Handle Empty States
  if (elements.length === 0) {
    return (
      <aside className="w-72 h-full border-l bg-white p-6 flex items-center justify-center text-center">
        <p className="text-gray-400 text-sm">
          Add elements from the sidebar to get started.
        </p>
      </aside>
    );
  }

  if (!selectedElementId) {
    return (
      <aside className="w-72 h-full border-l bg-white p-6 flex items-center justify-center text-center">
        <p className="text-gray-400 text-sm">
          Select an element on the canvas to edit its styles.
        </p>
      </aside>
    );
  }

  const currentStyles = getStyle(selectedElementId);

  // 2. Generic Input Handler
  const handleStyleChange = (property, value) => {
    updateStyle(selectedElementId, { [property]: value });
  };

  // DYNAMIC VISIBILITY LOGIC
  const isPropertyVisible = (prop) => {
    const d = currentStyles.display;
    const p = currentStyles.position;

    // FLEX ONLY CONTROLS
    if (
      [
        "flexDirection",
        "justifyContent",
        "alignItems",
        "alignContent",
        "flexWrap",
        "gap",
      ].includes(prop)
    ) {
      return d === "flex" || d === "inline-flex";
    }

    // GRID ONLY CONTROLS
    if (
      [
        "gridTemplateColumns",
        "gridTemplateRows",
        "columnGap",
        "rowGap",
        "justifyItems",
      ].includes(prop)
    ) {
      return d === "grid" || d === "inline-grid";
    }

    // POSITION CONTROLS
    if (["top", "right", "bottom", "left"].includes(prop)) {
      return p === "absolute" || p === "fixed" || p === "relative";
    }

    // Always visible
    return true;
  };

  return (
    <aside className="w-80 max-h-[100vh] border-l bg-white flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm uppercase tracking-wider text-gray-700">
            Inspector
          </h2>
          <span className="text-[10px] bg-gray-200 px-2 py-1 rounded text-gray-600 font-mono">
            ID: {selectedElementId.slice(0, 5)}...
          </span>
        </div>
      </div>

      {/* 3. Loop through Categories */}
      <div className="p-4 space-y-6">
        {cssCategories.map((category) => (
          <div key={category.title} className="border-b pb-4 last:border-0">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">
              {category.title}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {category.items
                .filter((item) => isPropertyVisible(item.prop))
                .map((item) => (
                  <div
                    key={item.prop}
                    className={`flex flex-col ${
                      item.type === "color" ? "col-span-1" : "col-span-2"
                    }`}
                  >
                    <label className="text-[11px] text-gray-600 font-medium mb-1">
                      {item.label}
                    </label>

                    {/* RENDER INPUT BASED ON TYPE */}
                    {item.type === "select" ? (
                      <select
                        value={currentStyles[item.prop] || ""}
                        onChange={(e) =>
                          handleStyleChange(item.prop, e.target.value)
                        }
                        className="w-full text-xs p-2 border rounded bg-white hover:border-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="">Default</option>
                        {item.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : item.type === "color" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentStyles[item.prop] || "#ffffff"}
                          onChange={(e) =>
                            handleStyleChange(item.prop, e.target.value)
                          }
                          className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                        />
                        <span className="text-xs text-gray-500 font-mono">
                          {currentStyles[item.prop] || "-"}
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder={item.placeholder || ""}
                        value={currentStyles[item.prop] || ""}
                        onChange={(e) =>
                          handleStyleChange(item.prop, e.target.value)
                        }
                        className="w-full text-xs p-2 border rounded hover:border-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
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
