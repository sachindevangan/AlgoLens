import { create } from "zustand";
import type { TraceResult, VariableType } from "../types";

type TraceStoreState = {
  code: string;
  trace: TraceResult | null;
  detectedTypes: Record<string, VariableType>;
  currentStep: number;
  isRunning: boolean;
  isPlaying: boolean;
  playSpeed: number;
  error: string | null;

  setCode: (code: string) => void;
  setTrace: (trace: TraceResult) => void;
  setDetectedTypes: (types: Record<string, VariableType>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setIsRunning: (val: boolean) => void;
  setIsPlaying: (val: boolean) => void;
  setPlaySpeed: (ms: number) => void;
  setError: (err: string | null) => void;
  reset: () => void;
};

export const useTraceStore = create<TraceStoreState>((set, get) => ({
  code: "",
  trace: null,
  detectedTypes: {},
  currentStep: 0,
  isRunning: false,
  isPlaying: false,
  playSpeed: 500,
  error: null,

  setCode: (code) => set({ code }),
  setTrace: (trace) => set({ trace, currentStep: 0, error: null }),
  setDetectedTypes: (types) => set({ detectedTypes: types }),
  setCurrentStep: (step) => set({ currentStep: Math.max(0, step) }),

  nextStep: () => {
    const { trace, currentStep } = get();
    if (!trace) return;
    const lastIndex = Math.max(0, trace.steps.length - 1);
    set({ currentStep: Math.min(lastIndex, currentStep + 1) });
  },

  prevStep: () => {
    const { currentStep } = get();
    set({ currentStep: Math.max(0, currentStep - 1) });
  },

  setIsRunning: (val) => set({ isRunning: val }),
  setIsPlaying: (val) => set({ isPlaying: val }),
  setPlaySpeed: (ms) => set({ playSpeed: Math.max(0, ms) }),
  setError: (err) => set({ error: err }),

  reset: () =>
    set({
      trace: null,
      detectedTypes: {},
      currentStep: 0,
      error: null,
      isRunning: false,
      isPlaying: false,
    }),
}));

