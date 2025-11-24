import { ElementProvider } from "./context/ElementCreateContext.jsx";
import { StyleProvider } from "./context/StyleContext.jsx";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import SettingsPanel from "./components/SettingsPanel";
import CodePanel from "./components/CodePanel";
import { useState } from "react";

export default function App() {
  const [showCreateElementContext, setShowCreateElementContext] =
    useState(false);

  return (
    <StyleProvider>
      <ElementProvider>
        <div className="flex flex-col h-screen">
          {/* Top Navbar */}
          <Navbar />

          {/* Main Layout */}
          <div className="flex flex-1">
            <Sidebar setShowCreateElementContext={setShowCreateElementContext} />

            <Canvas
              showCreateElementContext={showCreateElementContext}
              setShowCreateElementContext={setShowCreateElementContext}
            />

            <SettingsPanel />
          </div>

          {/* Bottom Code Panel */}
          <CodePanel />
        </div>
      </ElementProvider>
    </StyleProvider>
  );
}
