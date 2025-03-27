"use client";

import React, { useEffect, useMemo, useRef, useState } from "react"
import { useAppSelector } from "@/common"
import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"
import { Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils";
import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";
import { MotionSync } from "live2d-motionsync/stream";
import { modelMap } from "@/lib/models";

interface AvatarProps {
  audioTrack?: IMicrophoneAudioTrack,
  localAudioTrack?: IMicrophoneAudioTrack
}

(window as any).PIXI = PIXI;

export default function Avatar({ audioTrack }: AvatarProps) {
  const agentConnected = useAppSelector((state) => state.global.agentConnected)
  const trulienceAvatarRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(false)
  const motionSync = useRef<MotionSync>();
  // State for toggling fullscreen
  const [fullscreen, setFullscreen] = useState(false)

  const play = async (stream: MediaStream) => {
    if (!motionSync.current) return;
    console.log("Playing audio stream Start");
    // motionSync.current.play(stream);
    const mystream = await navigator.mediaDevices.getUserMedia({
        audio: true,
    });
    motionSync.current.play(stream);
  };

  // Update the Avatar’s audio stream whenever audioTrack or agentConnected changes
  useEffect(() => {
    // if(!agentConnected || !audioTrack || !trulienceAvatarRef.current) return;
    let app: PIXI.Application;
    let model: Live2DModel;
    const loadModel = async () => {
        if (!trulienceAvatarRef.current) return;
        setLoading(true);
        const modelUrl = modelMap["kei_vowels_pro"];
        app = new PIXI.Application({
          view: trulienceAvatarRef.current,
          resizeTo: trulienceAvatarRef.current.parentElement || undefined,
          backgroundAlpha: 0,
        });
        model = await Live2DModel.from(modelUrl, { autoInteract: false });
  
        // 获取模型横纵比
        const modelRatio = model.width / model.height;
        const centerModel = () => {
          // 让模型height为画布一半
          model.height = app.view.height;
          model.width = model.height * modelRatio;
          model.x = (app.view.width - model.width) / 2;
          model.y = 0;
        };
  
        centerModel();
        app.stage.addChild(model as unknown as PIXI.DisplayObject);
  
        motionSync.current = new MotionSync(model.internalModel);
        motionSync.current.loadMotionSyncFromUrl(
          modelUrl.replace(/.model(.)?.json/, ".motionsync3.json")
        );
        setLoading(false);
        if(audioTrack) {
            console.log("Playing audio stream");
            const stream = new MediaStream([audioTrack.getMediaStreamTrack()]);
            play(stream);
        }
    };
    loadModel();

    // Cleanup: unset media stream
    return () => {
        // app?.destroy();
        // model?.destroy();
    }
  }, [audioTrack, agentConnected]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-lg", {
      ["absolute top-0 left-0 h-screen w-screen rounded-none"]: fullscreen
    })}>
      <button
        className="absolute z-10 top-2 right-2 bg-black/50 p-2 rounded-lg hover:bg-black/70 transition"
        onClick={() => setFullscreen(prevValue => !prevValue)}
      >
        {fullscreen ? <Minimize className="text-white" size={24} /> : <Maximize className="text-white" size={24} />}
      </button>

      {/* Render the TrulienceAvatar */}
      <div className="h-full w-full">
        <canvas ref={trulienceAvatarRef} />
      </div>

      {
        loading &&
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-80">
          Loading...
        </div>
      }

    </div>
  )
}
