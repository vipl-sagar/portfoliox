'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TabPanel from './components/TabPanel';
import Terminal from './components/Terminal';

import AsciiBackground from './components/AsciiBackground';


export type Tab = {
  fileName: string;
  content: string;
};

export default function Home() {
  const [tabs, setTabs] = useState<Tab[]>([
    { fileName: 'about.md', content: "# creative technologist &\n# front-end engineer" }
  ]);
  const [activeTab, setActiveTab] = useState<string>('about.md');

  const handleOpenTab = (newTab: Tab) => {
    setTabs(prev => {
      const exists = prev.some(t => t.fileName === newTab.fileName);
      return exists ? prev : [...prev, newTab];
    });
    setActiveTab(newTab.fileName);
  };

  const handleCloseTab = (fileName: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(t => t.fileName !== fileName);
      if (newTabs.length > 0 && activeTab === fileName) {
        setActiveTab(newTabs[newTabs.length - 1].fileName);
      }
      return newTabs;
    });
  };

  const activeContent = tabs.find(t => t.fileName === activeTab)?.content || '';

  return (
    
    <div>
      <AsciiBackground />
      <main>
        <h1>Web Engineer & Creative Coder</h1>
        {/* Your content here */}
      </main>
    </div>
    // <div className="flex h-screen bg-[#1e1e1e] text-gray-100 overflow-hidden">
      
    //   <Sidebar onOpenTab={handleOpenTab} />
    //   <div className="flex flex-col flex-grow">
    //     <TabPanel
    //       tabs={tabs}
    //       activeTab={activeTab}
    //       activeContent={activeContent}
    //       onCloseTab={handleCloseTab}
    //       setActiveTab={setActiveTab}
    //     />
    //     <Terminal />
    //   </div>
    // </div>
  );
}



// https://finethought.com.au/