import React, { useState } from 'react';
import { Film, Play, Pause, Link as LinkIcon, Check, Sparkles } from 'lucide-react';

export interface VideoPreset {
  id: string;
  name: string;
  url: string;
  description: string;
}

export const WAREHOUSE_VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'warehouse-loop-mp4',
    name: 'Active Logistics & Staging Hub (HD MP4)',
    url: '/assets/warehouse-loop.mp4',
    description: 'Forklifts, pallet transport & dispatch docks',
  },
  {
    id: 'warehouse-docks-1',
    name: 'Distribution Center Loading Bays',
    url: '/assets/warehouse-logistics-1.webm',
    description: 'High-volume outbound distribution terminal',
  },
  {
    id: 'warehouse-docks-2',
    name: 'Interim Staging & Fleet Dispatch',
    url: '/assets/warehouse-logistics-2.webm',
    description: 'Active freight loading and fleet dispatching',
  },
  {
    id: 'logistics-harbor',
    name: 'Global Supply Chain Freight Terminal',
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    description: 'Intermodal freight transport & global flow',
  },
];

interface VideoSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVideoUrl: string;
  onSelectVideoUrl: (url: string) => void;
  overlayOpacity: number;
  onOpacityChange: (val: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const VideoSettingsModal: React.FC<VideoSettingsModalProps> = ({
  isOpen,
  onClose,
  currentVideoUrl,
  onSelectVideoUrl,
  overlayOpacity,
  onOpacityChange,
  isPlaying,
  onTogglePlay,
}) => {
  const [customInputUrl, setCustomInputUrl] = useState('');

  if (!isOpen) return null;

  const handleApplyCustom = () => {
    if (customInputUrl.trim()) {
      onSelectVideoUrl(customInputUrl.trim());
      setCustomInputUrl('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#0b132b] rounded-2xl border border-cyan-500/40 p-5 max-w-md w-full shadow-2xl relative text-xs animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#1d2d50]">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Cinematic Warehouse Atmosphere
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 text-base leading-none"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 my-4">
          {/* Play / Pause Toggle */}
          <div className="flex items-center justify-between bg-[#0a1324] p-3 rounded-xl border border-[#1e3458]">
            <div>
              <span className="font-semibold text-slate-200 block">Video Playback</span>
              <span className="text-[10px] text-slate-400">Looping background ambiance</span>
            </div>
            <button
              onClick={onTogglePlay}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs shadow transition-colors ${
                isPlaying
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Paused</span>
                </>
              )}
            </button>
          </div>

          {/* Opacity Slider */}
          <div className="bg-[#0a1324] p-3 rounded-xl border border-[#1e3458] space-y-1.5">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-semibold">Atmospheric Opacity</span>
              <span className="font-mono text-cyan-400 font-bold">{overlayOpacity}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={85}
              step={5}
              value={overlayOpacity}
              onChange={(e) => onOpacityChange(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Subtle (10%)</span>
              <span>Balanced (40%)</span>
              <span>Intense (85%)</span>
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-1.5">
            <span className="font-semibold text-slate-300 block">Select Atmosphere Preset</span>
            <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {WAREHOUSE_VIDEO_PRESETS.map((clip) => {
                const isActive = clip.url === currentVideoUrl;
                return (
                  <button
                    key={clip.id}
                    onClick={() => onSelectVideoUrl(clip.url)}
                    className={`text-left p-2.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-blue-600/30 border-cyan-400/60 text-white shadow-sm'
                        : 'bg-[#0a1324] border-[#1e3458] text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{clip.name}</span>
                      {isActive && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Active
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{clip.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Video URL input */}
          <div className="bg-[#0a1324] p-3 rounded-xl border border-[#1e3458] space-y-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Use Custom Video URL (.mp4 / webm)</span>
            </span>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/warehouse.mp4"
                value={customInputUrl}
                onChange={(e) => setCustomInputUrl(e.target.value)}
                className="flex-1 bg-[#0b132b] text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-[#1e3458] focus:border-cyan-500 focus:outline-none"
              />
              <button
                onClick={handleApplyCustom}
                disabled={!customInputUrl.trim()}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#1d2d50]">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg shadow hover:from-blue-500 hover:to-cyan-500"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
