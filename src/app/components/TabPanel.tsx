import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';

import { Tab } from "../page";

type TabPanelProps = {
  tabs: Tab[];
  activeTab: string;
  activeContent: string;
  onCloseTab: (fileName: string) => void;
  setActiveTab: (fileName: string) => void;
  
};



export default function TabPanel({
  tabs,
  activeTab,
  activeContent,
  onCloseTab,
  setActiveTab
}: TabPanelProps) {

  useEffect(() => {
    Prism.highlightAll();
  }, [activeContent]);

  function getLanguage(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    switch (extension) {
      case 'js': return 'javascript';
      case 'ts': case 'tsx': return 'typescript';
      case 'md': return 'markdown';
      case 'json': return 'json';
      case 'yml': case 'yaml': return 'yaml';
      case 'sh': return 'bash';
      default: return 'plaintext';
    }
  }


  return (
    <div className="flex flex-col flex-grow bg-[#1e1e1e]">
      {/* Editor Tabs */}
      <div className="flex bg-[#252526] border-b border-[#3c3c3c]">
        {tabs.map(tab => (
          <div 
            key={tab.fileName} 
            className={`flex items-center px-4 py-2 border-r border-[#3c3c3c] text-sm 
              ${activeTab === tab.fileName ? 'bg-[#1e1e1e]' : 'bg-[#252526]'}
              hover:bg-[#2d2d2d] cursor-pointer transition-colors duration-200`}
            onClick={() => setActiveTab(tab.fileName)}
          >
            <span className="text-gray-300">{tab.fileName}</span>
            <button
              className="ml-2 text-gray-500 hover:text-white transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.fileName);
              }}
              aria-label={`Close ${tab.fileName}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <pre className="p-6 font-mono text-sm">
  <code className={`language-${getLanguage(activeTab)}`}>
    {activeContent}
  </code>
</pre>

      {/* Editor Content */}
      <div className="flex-grow overflow-auto">
        {tabs.length > 0 ? (
          <div 
            className="p-6 font-mono text-sm whitespace-pre-wrap text-gray-300"
           
            
          />
          
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No open files
          </div>
        )}
      </div>
    </div>
  );
}