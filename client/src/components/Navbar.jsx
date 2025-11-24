import { CodeXml, Eye } from 'lucide-react'; // ✅ Fixed Import (CodeXml)

export default function Navbar({ showCodePanel, setShowCodePanel }) {
  return (
    <nav className="w-full h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm z-30 relative">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
        <span className="text-lg font-semibold text-gray-800 tracking-tight">LandingBuilder</span>
      </div>

      <div className="flex items-center gap-3 text-sm">
        {/* Toggle Code Panel Button */}
        <button 
          onClick={() => setShowCodePanel(!showCodePanel)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all
            ${showCodePanel 
              ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-inner' 
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }
          `}
        >
          <CodeXml size={16} />
          <span>{showCodePanel ? 'Hide Code' : 'View Code'}</span>
        </button>

        <div className="h-6 w-px bg-gray-300 mx-2"></div> {/* Separator */}

        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Eye size={16}/> Preview
        </button>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition-transform active:scale-95 font-medium flex items-center gap-2">
          Export
        </button>
      </div>
    </nav>
  );
}