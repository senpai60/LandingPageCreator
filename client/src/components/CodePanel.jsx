import { useState, useMemo } from "react";
import { useElementContext } from "../context/ElementCreateContext.jsx";

export default function CodePanel() {
  const { elements } = useElementContext();
  const [activeTab, setActiveTab] = useState("html");

  // --- GENERATORS ---

  // 1. Generate HTML String (Updated for Flat State)
  const generateHTML = useMemo(() => {
    // Recursive traversal helper
    const traverse = (nodeId, indent = 0) => {
      const node = elements[nodeId];
      if (!node) return "";

      const spaces = " ".repeat(indent);
      const classAttr = node.classList && node.classList.length > 0
          ? ` class="${node.classList.join(" ")}"`
          : "";
      
      const idAttr = ` id="${node.id}"`;
      
      const propsAttr = Object.entries(node.props || {})
        .map(([k, v]) => (v ? ` ${k}="${v}"` : ""))
        .join("");

      // Node type check (div, p, h1, etc.)
      const type = node.type || node.elementType || "div";

      const openTag = `${spaces}<${type}${idAttr}${classAttr}${propsAttr}>`;

      let inner = "";
      if (node.content && type !== 'img') {
        inner += `\n${" ".repeat(indent + 2)}${node.content}`;
      }
      
      // Children traversal
      if (node.children && node.children.length > 0) {
        inner += "\n" + node.children.map(childId => traverse(childId, indent + 2)).join("\n");
      }

      if (inner) inner += `\n${spaces}`;

      // Self-closing tags
      if (['img', 'br', 'hr', 'input'].includes(type)) {
        return `${spaces}<${type}${idAttr}${classAttr}${propsAttr} />`;
      }

      return `${openTag}${inner}</${type}>`;
    };

    // Start from ROOT
    return elements["root"] 
      ? `\n<div id="root-container">\n${traverse("root", 2)}\n</div>`
      : "";
  }, [elements]);

  // 2. Generate CSS String (Updated for Flat State)
  const generateCSS = useMemo(() => {
    // Convert dictionary values to array to iterate
    const cssString = Object.values(elements)
      .map((node) => {
        const rules = node.styles || {};
        if (Object.keys(rules).length === 0) return "";

        const ruleBlock = Object.entries(rules)
          .map(([prop, value]) => {
            // CamelCase to kebab-case
            const kebabProp = prop.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
            return `  ${kebabProp}: ${value};`;
          })
          .join("\n");

        return `#${node.id} {\n${ruleBlock}\n}`;
      })
      .join("\n\n");

    return `/* Global Reset */\n* { box-sizing: border-box; }\nbody { margin: 0; font-family: sans-serif; }\n\n/* Custom Styles */\n${cssString}`;
  }, [elements]);

  // 3. JS (Boilerplate)
  const generateJS = `
// LandingPage Logic
document.addEventListener('DOMContentLoaded', () => {
  console.log('Landing Page Loaded');
});`.trim();

  let codeToDisplay = "";
  switch (activeTab) {
    case "html": codeToDisplay = generateHTML; break;
    case "css": codeToDisplay = generateCSS; break;
    case "js": codeToDisplay = generateJS; break;
    default: codeToDisplay = "";
  }

  return (
    <div className="w-full h-64 border-t bg-[#1e1e1e] text-gray-300 flex flex-col z-30 relative">
      <div className="flex items-center bg-[#252526] px-2 border-b border-[#333]">
        <TabButton label="HTML" active={activeTab === "html"} onClick={() => setActiveTab("html")} />
        <TabButton label="CSS" active={activeTab === "css"} onClick={() => setActiveTab("css")} />
        <TabButton label="JS" active={activeTab === "js"} onClick={() => setActiveTab("js")} />
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        <pre><code>{codeToDisplay}</code></pre>
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-medium transition-colors border-r border-[#333] ${
        active ? "bg-[#1e1e1e] text-white border-t-2 border-t-blue-500" : "bg-[#2d2d2d] text-gray-500 hover:bg-[#2a2a2a]"
      }`}
    >
      {label}
    </button>
  );
}