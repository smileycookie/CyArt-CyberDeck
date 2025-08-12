// frontend\src\components\feature04\layer-pie-chart.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Smartphone, Cpu, Wifi, Battery, Settings, Touchpad, RefreshCw, HardDrive } from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';

const OUTER_DATA = [
  { name: 'Active Usage', value: 40, icon: <Smartphone size={12} />, color: '#1E3A8A' },
  { name: 'Background', value: 30, icon: <Cpu size={12} />, color: '#3B82F6' },
  { name: 'Network', value: 20, icon: <Wifi size={12} />, color: '#93C5FD' },
  { name: 'Power', value: 10, icon: <Battery size={12} />, color: '#BFDBFE' }
];

const INNER_DATA = [
  { name: 'UI Interactions', value: 25, icon: <Touchpad size={12} />, color: '#1E40AF' },
  { name: 'Background Sync', value: 15, icon: <RefreshCw size={12} />, color: '#2563EB' },
  { name: 'Data Transfer', value: 10, icon: <HardDrive size={12} />, color: '#60A5FA' },
  { name: 'Battery Usage', value: 5, icon: <Battery size={12} />, color: '#3B82F6' },
  { name: 'System', value: 5, icon: <Settings size={12} />, color: '#1E3A8A' }
];

const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200 text-xs">
        <p className="font-medium">{payload[0].name}: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function LayerPieChart() {
  const { agents } = useSocket();
  const [activeIndex, setActiveIndex] = React.useState<{outer: number|null, inner: number|null}>({outer: null, inner: null});
  const [outerData, setOuterData] = useState(OUTER_DATA);
  const [innerData, setInnerData] = useState(INNER_DATA);
  
  // Update chart data based on real-time agent information
  useEffect(() => {
    if (agents && agents.length > 0) {
      const onlineAgents = agents.filter(a => a.status === 'Online').length;
      const offlineAgents = agents.filter(a => a.status === 'Offline').length;
      const windowsAgents = agents.filter(a => a.osIcon === 'windows').length;
      const linuxAgents = agents.filter(a => a.osIcon === 'linux').length;
      const ubuntuAgents = agents.filter(a => a.osIcon === 'ubuntu').length;
      const totalAgents = agents.length;
      
      if (totalAgents > 0) {
        // Update outer data based on agent status and OS distribution
        const newOuterData = [
          { name: 'Online Agents', value: Math.round((onlineAgents / totalAgents) * 100), icon: <Smartphone size={12} />, color: '#1E3A8A' },
          { name: 'Windows Systems', value: Math.round((windowsAgents / totalAgents) * 100), icon: <Cpu size={12} />, color: '#3B82F6' },
          { name: 'Linux Systems', value: Math.round((linuxAgents / totalAgents) * 100), icon: <Wifi size={12} />, color: '#93C5FD' },
          { name: 'Ubuntu Systems', value: Math.round((ubuntuAgents / totalAgents) * 100), icon: <Battery size={12} />, color: '#BFDBFE' }
        ];
        
        // Update inner data based on detailed metrics
        const newInnerData = [
          { name: 'Active Monitoring', value: Math.round((onlineAgents / totalAgents) * 60), icon: <Touchpad size={12} />, color: '#1E40AF' },
          { name: 'Security Scans', value: Math.round((onlineAgents / totalAgents) * 25), icon: <RefreshCw size={12} />, color: '#2563EB' },
          { name: 'Log Collection', value: Math.round((totalAgents / totalAgents) * 15), icon: <HardDrive size={12} />, color: '#60A5FA' },
          { name: 'Offline Agents', value: Math.round((offlineAgents / totalAgents) * 100), icon: <Battery size={12} />, color: '#3B82F6' },
          { name: 'System Health', value: Math.round((onlineAgents / totalAgents) * 20), icon: <Settings size={12} />, color: '#1E3A8A' }
        ];
        
        setOuterData(newOuterData);
        setInnerData(newInnerData);
      }
    }
  }, [agents]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Title for Pie Chart */}
      <div className="px-4 pt-2 pb-1">
        <h3 className="text-sm font-medium">Device Resource Allocation</h3>
        <p className="text-xs text-gray-500">By feature category and sub-feature</p>
      </div>

      {/* Chart and Labels Container */}
      <div className="flex flex-1">
        {/* Pie Chart - Left Side */}
        <div className="w-[55%] h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={outerData}
                cx="50%"
                cy="50%"
                outerRadius={75}
                innerRadius={50}
                paddingAngle={1}
                dataKey="value"
                stroke="none"
                onMouseEnter={(_, index) => setActiveIndex({...activeIndex, outer: index})}
                onMouseLeave={() => setActiveIndex({...activeIndex, outer: null})}
              >
                {outerData.map((entry, index) => (
                  <Cell 
                    key={`outer-${index}`}
                    fill={activeIndex.outer === index ? '#1E40AF' : entry.color}
                  />
                ))}
              </Pie>
              <Pie
                data={innerData}
                cx="50%"
                cy="50%"
                outerRadius={40}
                innerRadius={15}
                paddingAngle={1}
                dataKey="value"
                stroke="none"
                onMouseEnter={(_, index) => setActiveIndex({...activeIndex, inner: index})}
                onMouseLeave={() => setActiveIndex({...activeIndex, inner: null})}
              >
                {innerData.map((entry, index) => (
                  <Cell 
                    key={`inner-${index}`}
                    fill={activeIndex.inner === index ? '#2563EB' : entry.color}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Labels - Right Side */}
        <div className="w-[45%] pl-2 pr-4 flex flex-col justify-center">
          <div className="mb-1">
            <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Primary</p>
            {outerData.map((item, index) => (
              <div 
                key={`outer-${item.name}`}
                className="flex items-center py-[1px] hover:bg-blue-50 rounded"
                onMouseEnter={() => setActiveIndex({...activeIndex, outer: index})}
                onMouseLeave={() => setActiveIndex({...activeIndex, outer: null})}
              >
                <div 
                  className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
                  style={{ 
                    backgroundColor: activeIndex.outer === index ? '#1E40AF' : item.color,
                  }}
                />
                <span className="text-[11px] flex-1 truncate">{item.name}</span>
                <span className="text-[11px] text-gray-500 mr-2">{item.value}%</span>
                {React.cloneElement(item.icon, {
                  className: "w-3 h-3 flex-shrink-0",
                  color: activeIndex.outer === index ? '#1E40AF' : item.color
                })}
              </div>
            ))}
          </div>

          <div>
            <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Sub-features</p>
            {innerData.map((item, index) => (
              <div 
                key={`inner-${item.name}`}
                className="flex items-center py-[1px] hover:bg-blue-50 rounded"
                onMouseEnter={() => setActiveIndex({...activeIndex, inner: index})}
                onMouseLeave={() => setActiveIndex({...activeIndex, inner: null})}
              >
                <div 
                  className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
                  style={{ 
                    backgroundColor: activeIndex.inner === index ? '#2563EB' : item.color,
                  }}
                />
                <span className="text-[11px] flex-1 truncate">{item.name}</span>
                <span className="text-[11px] text-gray-500 mr-2">{item.value}%</span>
                {React.cloneElement(item.icon, {
                  className: "w-3 h-3 flex-shrink-0",
                  color: activeIndex.inner === index ? '#2563EB' : item.color
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}