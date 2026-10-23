import React, { useState } from 'react';
import { Layers, X, Check, Lock, ChevronRight, ArrowLeft } from 'lucide-react';
import { VIRTUAL_FRAMES, FRAME_SHADOW_COLORS } from '../data/constants';
import { StreamerItem, SubscriptionTier } from '../types';

interface FramesModalProps {
  streamer: StreamerItem;
  isOpen: boolean;
  onClose: () => void;
  onSelectFrame: (streamerId: string, frameId: number | null, shadowColor?: string) => void;
  subscriptionTier: SubscriptionTier;
  onOpenSubscription: () => void;
}

// Visual specimen SVG rendering for all 8 frames - NO dividing border outlines or divider lines between video and shadow or between circles
export const FrameSpecimenSvg: React.FC<{
  frameId: number;
  shadowColor?: string;
  uniqueKey?: string;
  className?: string;
}> = ({ frameId, shadowColor = '#000000', uniqueKey = 'frame', className = 'w-full h-full' }) => {
  const maskId = `specimen-mask-${frameId}-${uniqueKey}`;
  const gradId = `specimen-grad-${frameId}-${uniqueKey}`;

  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Specimen Gradient: Yellow (bottom-left) to lime to green (top-right) */}
        <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="30%" stopColor="#eab308" />
          <stop offset="65%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>

        {/* Frame 8 triple overlapping circle cutout mask (seamless, no dividers between circles) */}
        {frameId === 8 && (
          <mask id={maskId}>
            <rect width="160" height="100" fill="white" />
            <circle cx="44" cy="50" r="44" fill="black" />
            <circle cx="80" cy="50" r="44" fill="black" />
            <circle cx="116" cy="50" r="44" fill="black" />
          </mask>
        )}
      </defs>

      {/* 1. Underlying video canvas gradient */}
      <rect width="160" height="100" fill={`url(#${gradId})`} />

      {/* 2. Specific frame outer shadow (NO dividing outlines) */}
      {frameId === 1 && (
        /* Frame 1: Full frame - 100% video image, no outer shadow, no dividing border */
        null
      )}

      {frameId === 2 && (
        /* Frame 2: Narrow shadow on top and bottom, seamless */
        <g>
          <rect x="0" y="0" width="160" height="11" fill={shadowColor} />
          <rect x="0" y="89" width="160" height="11" fill={shadowColor} />
        </g>
      )}

      {frameId === 3 && (
        /* Frame 3: Wide shadow on top and bottom (cinematic letterbox), seamless */
        <g>
          <rect x="0" y="0" width="160" height="22" fill={shadowColor} />
          <rect x="0" y="78" width="160" height="22" fill={shadowColor} />
        </g>
      )}

      {frameId === 4 && (
        /* Frame 4: Pillarbox side shadow on left and right, seamless */
        <g>
          <rect x="0" y="0" width="24" height="100" fill={shadowColor} />
          <rect x="136" y="0" width="24" height="100" fill={shadowColor} />
        </g>
      )}

      {frameId === 5 && (
        /* Frame 5: Octagon / chamfered corners with outer shadow, seamless */
        <path
          d="M 0 0 H 160 V 100 H 0 Z M 18 0 L 142 0 L 160 18 L 160 82 L 142 100 L 18 100 L 0 82 L 0 18 Z"
          fill={shadowColor}
          fillRule="evenodd"
        />
      )}

      {frameId === 6 && (
        /* Frame 6: Rounded rectangle with corner shadow, seamless */
        <path
          d="M 0 0 H 160 V 100 H 0 Z M 24 5 H 136 A 18 18 0 0 1 154 23 V 77 A 18 18 0 0 1 136 95 H 24 A 18 18 0 0 1 6 77 V 23 A 18 18 0 0 1 24 5 Z"
          fill={shadowColor}
          fillRule="evenodd"
        />
      )}

      {frameId === 7 && (
        /* Frame 7: Capsule Stadium shape with surrounding shadow, seamless */
        <path
          d="M 0 0 H 160 V 100 H 0 Z M 51 5 H 109 A 45 45 0 0 1 154 50 A 45 45 0 0 1 109 95 H 51 A 45 45 0 0 1 6 50 A 45 45 0 0 1 51 5 Z"
          fill={shadowColor}
          fillRule="evenodd"
        />
      )}

      {frameId === 8 && (
        /* Frame 8: Triple overlapping circle bubble scallop cutout - seamless without dividing circles */
        <rect width="160" height="100" fill={shadowColor} mask={`url(#${maskId})`} />
      )}
    </svg>
  );
};

export const FramesModal: React.FC<FramesModalProps> = ({
  streamer,
  isOpen,
  onClose,
  onSelectFrame,
  subscriptionTier,
  onOpenSubscription,
}) => {
  // Step 1: 'select_frame' (smaller compact list of 8 frames with Cancel & Select button, no written text)
  // Step 2: 'customize_color' (small box with selected frame on top and rounded colors on bottom, Cancel & Done)
  const [modalStep, setModalStep] = useState<'select_frame' | 'customize_color'>('select_frame');
  const [selectedFrameId, setSelectedFrameId] = useState<number>(streamer.frameId || 1);
  const [selectedShadowColor, setSelectedShadowColor] = useState<string>(
    streamer.frameShadowColor || '#000000'
  );
  const [showPaidNotice, setShowPaidNotice] = useState(false);

  if (!isOpen) return null;

  const isPaid = subscriptionTier === 'basic' || subscriptionTier === 'premium';

  // Cancel in Step 1
  const handleCancelSelection = () => {
    setModalStep('select_frame');
    setShowPaidNotice(false);
    onClose();
  };

  // Select in Step 1 -> proceed to Step 2
  const handleProceedToColor = () => {
    if (!isPaid) {
      setShowPaidNotice(true);
      return;
    }
    setModalStep('customize_color');
  };

  // Back from Step 2 to Step 1
  const handleBackToFrames = () => {
    setModalStep('select_frame');
  };

  // Done in Step 2 -> Apply frame and shadow color to streamer
  const handleConfirmDone = () => {
    if (!isPaid) {
      setShowPaidNotice(true);
      return;
    }
    onSelectFrame(streamer.id, selectedFrameId, selectedShadowColor);
    setModalStep('select_frame');
    onClose();
  };

  return (
    <div
      id="frames-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in select-none"
    >
      {modalStep === 'select_frame' ? (
        /* STEP 1: Wrapped list of all 8 video frames - SMALLER SIZE & NO WRITTEN CONTEXTS/WORDS */
        <div
          id="frames-modal-container"
          className="w-full max-w-md bg-[#1c222b] border border-[#374252] rounded-2xl p-4 text-slate-100 shadow-2xl animate-in zoom-in-95 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#2d3744]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white">Video Frames</h3>
                <p className="text-[10px] text-slate-400">
                  Target: <span className="text-sky-400 font-semibold">{streamer.customName}</span>
                </p>
              </div>
            </div>
            <button
              id="close-frames-modal"
              onClick={handleCancelSelection}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#2b3340] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Paid subscription banner */}
          {!isPaid && (
            <div className="mt-2.5 p-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-indigo-500/15 border border-amber-500/30 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[11px] text-amber-200">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Frames require a paid subscription.</span>
              </div>
              <button
                id="unlock-frames-subscription-btn"
                onClick={() => {
                  onClose();
                  onOpenSubscription();
                }}
                className="px-2 py-0.5 rounded bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-[10px] shrink-0 hover:brightness-110 shadow"
              >
                Unlock
              </button>
            </div>
          )}

          {showPaidNotice && !isPaid && (
            <div className="mt-2 p-2 rounded-lg bg-red-500/20 border border-red-500/40 text-[11px] text-red-200 flex items-center justify-between animate-in fade-in">
              <span>Paid subscription required to apply.</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSubscription();
                }}
                className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-[10px]"
              >
                Upgrade
              </button>
            </div>
          )}

          {/* Wrapped list of all 8 video frames: Smaller size & NO written contexts or words */}
          <div
            id="wrapped-frames-list"
            className="grid grid-cols-4 gap-2 my-3 overflow-y-auto"
          >
            {VIRTUAL_FRAMES.map((frame) => {
              const isSelected = selectedFrameId === frame.id;

              return (
                <button
                  key={frame.id}
                  id={`frame-card-${frame.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedFrameId(frame.id);
                    setShowPaidNotice(false);
                  }}
                  className={`relative rounded-lg border aspect-[16/10] overflow-hidden transition-all duration-150 active:scale-95 group focus:outline-none ${
                    isSelected
                      ? 'border-sky-400 ring-2 ring-sky-400/60 shadow-lg scale-[1.03] z-10'
                      : 'border-[#2d3748] hover:border-slate-400 hover:scale-[1.02] opacity-90 hover:opacity-100'
                  }`}
                  title={`Frame ${frame.id}`}
                >
                  {/* Visual Specimen Viewport - Smaller, seamless, no dividing outline */}
                  <FrameSpecimenSvg
                    frameId={frame.id}
                    shadowColor={selectedShadowColor}
                    uniqueKey={`list-${frame.id}`}
                  />

                  {/* Active selection checkmark */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-sky-500 text-white rounded-full p-0.5 shadow-md">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Bar: Cancel on left, Select on right */}
          <div className="flex items-center justify-between pt-2.5 border-t border-[#2d3744] gap-2">
            <button
              id="cancel-frame-selection-btn"
              type="button"
              onClick={handleCancelSelection}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#28313e] hover:bg-[#344052] text-slate-300 transition-colors"
            >
              Cancel
            </button>

            <button
              id="select-frame-btn"
              type="button"
              onClick={handleProceedToColor}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-md shadow-sky-500/25 flex items-center gap-1"
            >
              <span>Select</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: Small box containing the selected frame on top, and rounded rainbow colors on bottom */
        <div
          id="frame-color-customizer-box"
          className="w-full max-w-xs sm:max-w-sm bg-[#1c222b] border border-[#374252] rounded-2xl p-4 text-slate-100 shadow-2xl animate-in zoom-in-95 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#2d3744]">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleBackToFrames}
                className="p-1 rounded-lg hover:bg-[#2b3340] text-slate-400 hover:text-white"
                title="Back to frames list"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h3 className="text-xs sm:text-sm font-bold text-white">Shadow Color</h3>
            </div>
            <button
              onClick={handleCancelSelection}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#2b3340]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Top: Selected frame preview box (clean, smaller, no dividing outlines) */}
          <div className="my-2.5 flex flex-col items-center">
            <div className="w-full aspect-[16/10] bg-black rounded-xl overflow-hidden shadow-xl border border-[#323d4e] relative">
              <FrameSpecimenSvg
                frameId={selectedFrameId}
                shadowColor={selectedShadowColor}
                uniqueKey="customizer"
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between w-full text-[10px] px-1">
              <span className="text-slate-400">Frame {selectedFrameId}</span>
              <span className="font-mono text-slate-300 flex items-center gap-1">
                <span>Color:</span>
                <span
                  className="w-2 h-2 rounded-full border border-white/30 inline-block"
                  style={{ backgroundColor: selectedShadowColor }}
                />
                <span className="font-semibold text-slate-200">
                  {FRAME_SHADOW_COLORS.find((c) => c.hex.toLowerCase() === selectedShadowColor.toLowerCase())?.name || 'Black'}
                </span>
              </span>
            </div>
          </div>

          {/* Bottom: Small rounded boxes of all rainbow colors, to include black, brown and white */}
          <div className="mt-1 mb-3 p-2.5 rounded-xl bg-[#141820] border border-[#2b3442]">
            <div
              id="shadow-color-boxes-row"
              className="grid grid-cols-6 gap-1.5 sm:gap-2 place-items-center"
            >
              {FRAME_SHADOW_COLORS.map((col) => {
                const isSelected = selectedShadowColor.toLowerCase() === col.hex.toLowerCase();
                return (
                  <button
                    key={col.hex}
                    id={`shadow-color-btn-${col.name.toLowerCase()}`}
                    type="button"
                    onClick={() => setSelectedShadowColor(col.hex)}
                    title={col.name}
                    className={`w-7 h-7 rounded-lg transition-transform active:scale-90 flex items-center justify-center relative shadow-sm ${
                      isSelected
                        ? 'ring-2 ring-sky-400 ring-offset-1 ring-offset-[#141820] scale-110'
                        : 'hover:scale-105 border border-white/15'
                    }`}
                    style={{
                      backgroundColor: col.hex,
                      borderColor: col.border,
                    }}
                  >
                    {isSelected && (
                      <Check
                        className={`w-3 h-3 stroke-[3] ${
                          col.hex === '#ffffff' || col.hex === '#eab308'
                            ? 'text-slate-900'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Controls: 'Cancel' and 'Done' button for applying the frame to a streamer */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2d3744] gap-2">
            <button
              id="cancel-color-btn"
              type="button"
              onClick={handleBackToFrames}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#28313e] hover:bg-[#344052] text-slate-300 transition-colors"
            >
              Cancel
            </button>

            <button
              id="done-apply-frame-btn"
              type="button"
              onClick={handleConfirmDone}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md shadow-emerald-500/25 flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Done</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
