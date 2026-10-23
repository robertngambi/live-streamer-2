import { SavedMediaItem, StreamerItem } from '../types';

export function formatTimeHHMMSS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${pad(hours)}.${pad(minutes)}.${pad(seconds)}`;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export type RecentsCategoryType =
  | 'Photos'
  | 'Edited streamers'
  | 'All camera streamers'
  | 'Audio outputs';

export function getRecentsCategory(item: SavedMediaItem): RecentsCategoryType {
  if (item.folder === 'Photos' || item.mediaType === 'photo') {
    return 'Photos';
  }
  if (item.folder === 'Edited Output') {
    return 'Edited streamers';
  }
  if (item.folder === 'Streamer Output') {
    return 'All camera streamers';
  }
  if (item.folder === 'Audio Output' || item.mediaType === 'audio') {
    return 'Audio outputs';
  }
  if (item.mediaType === 'video' && item.fileName.toLowerCase().includes('raw')) {
    return 'All camera streamers';
  }
  return 'Edited streamers';
}

export const INITIAL_SAVED_FILES: SavedMediaItem[] = [
  {
    id: 'rec-001',
    folder: 'Photos',
    fileName: 'Snap_LiveStudio_20261008_0520.jpg',
    format: 'JPEG',
    timestamp: 'Just now',
    fileSizeBytes: 3450000,
    quality: '4K High Res',
    cameraName: 'USB Pro Cam (External)',
    mediaType: 'photo',
  },
  {
    id: 'rec-002',
    folder: 'Edited Output',
    fileName: 'Edited_Stream_Keynote_20261008_0515.mp4',
    format: 'Mp4',
    timestamp: '5 mins ago',
    fileSizeBytes: 54200000,
    durationFormatted: '00.14.30',
    quality: '1080p',
    fps: 60,
    cameraName: 'Live Edited Mix',
    mediaType: 'video',
  },
  {
    id: 'rec-003',
    folder: 'Streamer Output',
    fileName: 'Raw_FrontCam_Self_0515.mp4',
    format: 'Mp4',
    timestamp: '6 mins ago',
    fileSizeBytes: 38100000,
    durationFormatted: '00.14.30',
    quality: '1080p',
    fps: 30,
    cameraName: 'Front Camera (Self)',
    mediaType: 'video',
  },
  {
    id: 'rec-004',
    folder: 'Audio Output',
    fileName: 'AudioMaster_Track_0515.aac',
    format: 'AAC/M4A',
    timestamp: '6 mins ago',
    fileSizeBytes: 12400000,
    durationFormatted: '00.14.30',
    quality: '320 kbps Studio',
    mediaType: 'audio',
  },
  {
    id: 'rec-005',
    folder: 'Photos',
    fileName: 'Photo_Host_Closeup_0458.jpg',
    format: 'JPEG',
    timestamp: '25 mins ago',
    fileSizeBytes: 2900000,
    quality: '1080p Crisp',
    cameraName: 'Front Camera (Self)',
    mediaType: 'photo',
  },
  {
    id: 'rec-006',
    folder: 'Edited Output',
    fileName: 'Edited_Stream_Podcast_0442.mp4',
    format: 'MKV',
    timestamp: '40 mins ago',
    fileSizeBytes: 98000000,
    durationFormatted: '00.28.12',
    quality: '1080p',
    fps: 60,
    cameraName: 'Podcast Studio Frame',
    mediaType: 'video',
  },
  {
    id: 'rec-007',
    folder: 'Streamer Output',
    fileName: 'Raw_USB_ProCam_0442.mp4',
    format: 'MKV',
    timestamp: '41 mins ago',
    fileSizeBytes: 62000000,
    durationFormatted: '00.28.12',
    quality: '1080p',
    fps: 60,
    cameraName: 'USB Pro Cam (External)',
    mediaType: 'video',
  },
  {
    id: 'rec-008',
    folder: 'Streamer Output',
    fileName: 'Raw_WiFi_ActionCam_0442.mp4',
    format: 'MKV',
    timestamp: '42 mins ago',
    fileSizeBytes: 71000000,
    durationFormatted: '00.28.12',
    quality: '1080p',
    fps: 60,
    cameraName: 'Wi-Fi ActionCam 4K',
    mediaType: 'video',
  },
  {
    id: 'rec-009',
    folder: 'Photos',
    fileName: 'Snap_MultiAngle_Action_0410.jpg',
    format: 'JPEG',
    timestamp: '1 hour ago',
    fileSizeBytes: 4120000,
    quality: '4K Ultra HD',
    cameraName: 'Wi-Fi ActionCam 4K',
    mediaType: 'photo',
  },
  {
    id: 'rec-010',
    folder: 'Audio Output',
    fileName: 'Podcast_StudioMic_Clean_0330.wav',
    format: 'WAV',
    timestamp: '2 hours ago',
    fileSizeBytes: 31000000,
    durationFormatted: '00.32.40',
    quality: 'Lossless 48kHz',
    mediaType: 'audio',
  },
  {
    id: 'rec-011',
    folder: 'Edited Output',
    fileName: 'Edited_Stream_NeonCyber_0330.mp4',
    format: 'Mp4',
    timestamp: '2 hours ago',
    fileSizeBytes: 115000000,
    durationFormatted: '00.32.40',
    quality: '1080p 60fps',
    fps: 60,
    cameraName: 'Neon Cyberpunk Mix',
    mediaType: 'video',
  },
  {
    id: 'rec-012',
    folder: 'Streamer Output',
    fileName: 'Raw_OverheadCam_Desk_0330.mp4',
    format: 'Mp4',
    timestamp: '2 hours ago',
    fileSizeBytes: 45000000,
    durationFormatted: '00.32.40',
    quality: '720p',
    fps: 30,
    cameraName: 'Overhead Cam (USB)',
    mediaType: 'video',
  },
  {
    id: 'rec-013',
    folder: 'Photos',
    fileName: 'Portrait_Studio_Light_0215.jpg',
    format: 'JPEG',
    timestamp: '3 hours ago',
    fileSizeBytes: 2780000,
    quality: '1080p HDR',
    cameraName: 'Front Camera (Self)',
    mediaType: 'photo',
  },
  {
    id: 'rec-014',
    folder: 'Edited Output',
    fileName: 'Edited_Stream_GoldenLux_0120.mp4',
    format: 'Mp4',
    timestamp: '4 hours ago',
    fileSizeBytes: 86500000,
    durationFormatted: '00.22.15',
    quality: '1080p',
    fps: 60,
    cameraName: 'Golden Luxury Frame',
    mediaType: 'video',
  },
  {
    id: 'rec-015',
    folder: 'Streamer Output',
    fileName: 'Raw_Drone_Streamer_0120.mp4',
    format: 'Mp4',
    timestamp: '4 hours ago',
    fileSizeBytes: 52000000,
    durationFormatted: '00.22.15',
    quality: '1080p',
    fps: 60,
    cameraName: 'Wi-Fi Drone Streamer',
    mediaType: 'video',
  },
  {
    id: 'rec-016',
    folder: 'Audio Output',
    fileName: 'VoiceTrack_Stereo_0045.aac',
    format: 'AAC/M4A',
    timestamp: '5 hours ago',
    fileSizeBytes: 8900000,
    durationFormatted: '00.18.20',
    quality: '256 kbps Stereo',
    mediaType: 'audio',
  },
  {
    id: 'rec-017',
    folder: 'Photos',
    fileName: 'Capture_HighRes_0045.jpg',
    format: 'JPEG',
    timestamp: '5 hours ago',
    fileSizeBytes: 3100000,
    quality: '4K Still',
    cameraName: 'USB Studio Macro',
    mediaType: 'photo',
  },
  {
    id: 'rec-018',
    folder: 'Edited Output',
    fileName: 'Edited_Stream_Broadcast_2330.mp4',
    format: 'MKV',
    timestamp: 'Yesterday, 11:30 PM',
    fileSizeBytes: 142000000,
    durationFormatted: '00.41.05',
    quality: '1080p',
    fps: 60,
    cameraName: 'Studio Broadcast HUD',
    mediaType: 'video',
  },
  {
    id: 'rec-019',
    folder: 'Streamer Output',
    fileName: 'Raw_HDMI_BroadcastCam_2330.mp4',
    format: 'MKV',
    timestamp: 'Yesterday, 11:30 PM',
    fileSizeBytes: 98000000,
    durationFormatted: '00.41.05',
    quality: '1080p',
    fps: 60,
    cameraName: 'HDMI Studio Broadcast Cam',
    mediaType: 'video',
  },
  {
    id: 'rec-020',
    folder: 'Photos',
    fileName: 'Snap_Previewer_FullShot_2210.jpg',
    format: 'JPEG',
    timestamp: 'Yesterday, 10:10 PM',
    fileSizeBytes: 2650000,
    quality: '1080p',
    cameraName: 'Rear Camera (Self)',
    mediaType: 'photo',
  },
  {
    id: 'rec-021',
    folder: 'Audio Output',
    fileName: 'Ambient_Soundtrack_2115.mp3',
    format: 'MP3',
    timestamp: 'Yesterday, 09:15 PM',
    fileSizeBytes: 6400000,
    durationFormatted: '00.15.50',
    quality: '320 kbps MP3',
    mediaType: 'audio',
  },
  {
    id: 'rec-022',
    folder: 'Edited Output',
    fileName: 'Edited_Stream_SportsHUD_2115.mp4',
    format: 'Mp4',
    timestamp: 'Yesterday, 09:15 PM',
    fileSizeBytes: 64000000,
    durationFormatted: '00.15.50',
    quality: '720p',
    fps: 60,
    cameraName: 'Sports Live HUD',
    mediaType: 'video',
  },
  {
    id: 'rec-023',
    folder: 'Streamer Output',
    fileName: 'Raw_Bluetooth_WirelessCam_1950.mp4',
    format: 'Mp4',
    timestamp: 'Yesterday, 07:50 PM',
    fileSizeBytes: 24000000,
    durationFormatted: '00.10.12',
    quality: '720p',
    fps: 30,
    cameraName: 'Bluetooth Wireless Cam',
    mediaType: 'video',
  },
  {
    id: 'rec-024',
    folder: 'Photos',
    fileName: 'Backstage_Snap_1820.jpg',
    format: 'JPEG',
    timestamp: 'Yesterday, 06:20 PM',
    fileSizeBytes: 3300000,
    quality: '4K High Res',
    cameraName: 'USB Pro Cam (External)',
    mediaType: 'photo',
  },
  {
    id: 'rec-025',
    folder: 'Edited Output',
    fileName: 'Edited_Stream_Interview_1710.mp4',
    format: 'Mp4',
    timestamp: 'Yesterday, 05:10 PM',
    fileSizeBytes: 104000000,
    durationFormatted: '00.35.00',
    quality: '1080p',
    fps: 30,
    cameraName: 'Minimalist Clean Frame',
    mediaType: 'video',
  },
  {
    id: 'rec-026',
    folder: 'Streamer Output',
    fileName: 'Raw_Macro_Lens_1605.mp4',
    format: 'Mp4',
    timestamp: 'Yesterday, 04:05 PM',
    fileSizeBytes: 31000000,
    durationFormatted: '00.08.45',
    quality: '1080p',
    fps: 60,
    cameraName: 'USB Studio Macro',
    mediaType: 'video',
  },
];

// Helper to draw realistic simulated video frame onto a canvas
export function drawLiveStreamCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  streamer: StreamerItem,
  timestamp: number,
  isMainEditor: boolean = false,
  customFps: number = 30
) {
  // Background gradient representing studio/scene lighting
  const seed = streamer.syntheticSeed || 100;
  const gradient = ctx.createLinearGradient(0, 0, width, height);

  const hue1 = (seed * 37 + (timestamp / 50)) % 360;
  const hue2 = (hue1 + 75) % 360;

  gradient.addColorStop(0, `hsl(${hue1}, 45%, 18%)`);
  gradient.addColorStop(0.5, `hsl(${hue2}, 35%, 12%)`);
  gradient.addColorStop(1, `hsl(${(hue1 + 180) % 360}, 50%, 8%)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Grid/Studio background room lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  const gridSize = isMainEditor ? 40 : 20;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Animated Subject / Presenter Silhouette or Dynamic Graphic
  const centerX = width * 0.5 + Math.sin(timestamp / 800 + seed) * (width * 0.04);
  const centerY = height * 0.55 + Math.cos(timestamp / 900 + seed) * (height * 0.02);
  const radius = Math.min(width, height) * 0.22;

  // Head/Presenter
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.arc(centerX, centerY - radius * 0.6, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // Torso
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + radius * 0.6, radius * 0.8, radius * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Studio soft light spotlight circle
  const spotGrad = ctx.createRadialGradient(
    centerX,
    centerY - radius * 0.4,
    5,
    centerX,
    centerY,
    radius * 1.5
  );
  spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
  spotGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.03)');
  spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = spotGrad;
  ctx.fillRect(0, 0, width, height);

  // Focus Tracker bounding box around subject
  const boxW = radius * 1.3;
  const boxH = radius * 1.5;
  const boxX = centerX - boxW / 2;
  const boxY = centerY - radius * 0.9;

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // Corner brackets on focus box
  const cornerLen = 8;
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 2.5;
  // top-left
  ctx.beginPath();
  ctx.moveTo(boxX, boxY + cornerLen);
  ctx.lineTo(boxX, boxY);
  ctx.lineTo(boxX + cornerLen, boxY);
  ctx.stroke();
  // top-right
  ctx.beginPath();
  ctx.moveTo(boxX + boxW - cornerLen, boxY);
  ctx.lineTo(boxX + boxW, boxY);
  ctx.lineTo(boxX + boxW, boxY + cornerLen);
  ctx.stroke();
  // bottom-left
  ctx.beginPath();
  ctx.moveTo(boxX, boxY + boxH - cornerLen);
  ctx.lineTo(boxX, boxY + boxH);
  ctx.lineTo(boxX + cornerLen, boxY + boxH);
  ctx.stroke();
  // bottom-right
  ctx.beginPath();
  ctx.moveTo(boxX + boxW - cornerLen, boxY + boxH);
  ctx.lineTo(boxX + boxW, boxY + boxH);
  ctx.lineTo(boxX + boxW, boxY + boxH - cornerLen);
  ctx.stroke();

  // Face tag label
  ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.fillRect(boxX, boxY - 14, 62, 13);
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('AF-TRACK 99%', boxX + 3, boxY - 4);

  // Telemetry HUD text (top left)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(8, 8, isMainEditor ? 140 : 100, isMainEditor ? 36 : 24);
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(16, 18, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = isMainEditor ? 'bold 11px monospace' : 'bold 9px monospace';
  ctx.fillText(`LIVE • ${customFps} FPS`, 24, 20);

  if (isMainEditor) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px monospace';
    ctx.fillText(`${streamer.resolution} • ${streamer.sourceType.toUpperCase()}`, 16, 36);
  }

  // Audio VU Level Meter inside camera stream
  const soundLevel = (streamer.audioLevel / 100) * (0.4 + 0.6 * Math.sin(timestamp / 120 + seed));
  const meterW = isMainEditor ? 80 : 50;
  const meterH = 5;
  const meterX = width - meterW - 10;
  const meterY = 12;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(meterX, meterY, meterW, meterH);

  const activeMeterW = Math.max(2, meterW * soundLevel);
  ctx.fillStyle = soundLevel > 0.85 ? '#ef4444' : soundLevel > 0.6 ? '#f59e0b' : '#22c55e';
  ctx.fillRect(meterX, meterY, activeMeterW, meterH);

  // Camera Custom Name badge (bottom left)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(8, height - 26, isMainEditor ? 160 : 110, 20);
  ctx.fillStyle = '#ffffff';
  ctx.font = isMainEditor ? 'bold 11px sans-serif' : '10px sans-serif';
  ctx.fillText(
    streamer.customName.length > 18 ? streamer.customName.slice(0, 16) + '..' : streamer.customName,
    14,
    height - 12
  );
}

// Generate virtual frame shadow overlay based on the 8 specimen frames (no dividing border outlines)
export function renderVirtualFrameOverlay(
  frameId: number | null,
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D,
  shadowColor: string = '#000000'
) {
  if (!frameId || frameId === 1) {
    // Frame 1: Full Frame - Video is 100% full, no outer shadow
    return;
  }

  switch (frameId) {
    case 2: {
      // Frame 2: Narrow shadow on top and bottom, seamless video in middle
      const topH = Math.round(height * 0.11);
      const botH = Math.round(height * 0.11);

      ctx.save();
      ctx.fillStyle = shadowColor;
      ctx.fillRect(0, 0, width, topH);
      ctx.fillRect(0, height - botH, width, botH);
      ctx.restore();
      break;
    }

    case 3: {
      // Frame 3: Wide shadow on top and bottom (deep cinematic letterbox)
      const topH = Math.round(height * 0.22);
      const botH = Math.round(height * 0.22);

      ctx.save();
      ctx.fillStyle = shadowColor;
      ctx.fillRect(0, 0, width, topH);
      ctx.fillRect(0, height - botH, width, botH);
      ctx.restore();
      break;
    }

    case 4: {
      // Frame 4: Pillarbox side shadow on left and right, video in middle
      const sideW = Math.round(width * 0.16);

      ctx.save();
      ctx.fillStyle = shadowColor;
      ctx.fillRect(0, 0, sideW, height);
      ctx.fillRect(width - sideW, 0, sideW, height);
      ctx.restore();
      break;
    }

    case 5: {
      // Frame 5: Octagon / Chamfered corners with outer shadow
      const c = Math.round(Math.min(width, height) * 0.16);

      ctx.save();
      ctx.fillStyle = shadowColor;
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      ctx.moveTo(c, 0);
      ctx.lineTo(width - c, 0);
      ctx.lineTo(width, c);
      ctx.lineTo(width, height - c);
      ctx.lineTo(width - c, height);
      ctx.lineTo(c, height);
      ctx.lineTo(0, height - c);
      ctx.lineTo(0, c);
      ctx.closePath();
      ctx.fill('evenodd');
      ctx.restore();
      break;
    }

    case 6: {
      // Frame 6: Rounded rectangle with outer corner shadow
      const padX = Math.round(width * 0.04);
      const padY = Math.round(height * 0.05);
      const inW = width - padX * 2;
      const inH = height - padY * 2;
      const r = Math.round(height * 0.18);

      ctx.save();
      ctx.fillStyle = shadowColor;
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(padX, padY, inW, inH, r);
      } else {
        ctx.rect(padX, padY, inW, inH);
      }
      ctx.fill('evenodd');
      ctx.restore();
      break;
    }

    case 7: {
      // Frame 7: Capsule Stadium (pill shape) with corner/surrounding shadow
      const padX = Math.round(width * 0.04);
      const padY = Math.round(height * 0.05);
      const inW = width - padX * 2;
      const inH = height - padY * 2;
      const r = inH / 2;

      ctx.save();
      ctx.fillStyle = shadowColor;
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(padX, padY, inW, inH, r);
      } else {
        ctx.rect(padX, padY, inW, inH);
      }
      ctx.fill('evenodd');
      ctx.restore();
      break;
    }

    case 8: {
      // Frame 8: Triple overlapping circle bubble scallop cutout (seamless, no dividing lines)
      const cy = height / 2;
      const r = Math.round(height * 0.44);
      const cx1 = width * 0.28;
      const cx2 = width * 0.50;
      const cx3 = width * 0.72;

      ctx.save();
      try {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = width;
        offCanvas.height = height;
        const offCtx = offCanvas.getContext('2d');
        if (offCtx) {
          offCtx.fillStyle = shadowColor;
          offCtx.fillRect(0, 0, width, height);
          offCtx.globalCompositeOperation = 'destination-out';
          offCtx.beginPath();
          offCtx.arc(cx1, cy, r, 0, Math.PI * 2);
          offCtx.arc(cx2, cy, r, 0, Math.PI * 2);
          offCtx.arc(cx3, cy, r, 0, Math.PI * 2);
          offCtx.fill();
          ctx.drawImage(offCanvas, 0, 0);
        }
      } catch {
        // Fallback
      }
      ctx.restore();
      break;
    }
  }
}
