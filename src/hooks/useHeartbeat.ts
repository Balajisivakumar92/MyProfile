import { useRef, useState, useEffect, useCallback } from 'react';

export const useHeartbeat = () => {
    const [isMuted, setIsMuted] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);

    // Beat scheduling refs
    const nextNoteTimeRef = useRef<number>(0);
    const currentBpmRef = useRef<number>(60);
    const targetBpmRef = useRef<number>(60);
    const requestRef = useRef<number | null>(null);

    const isFlatliningRef = useRef(false);
    const flatlineTimeoutRef = useRef<number | null>(null);

    // Initialize Audio Context
    const initAudio = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume().then(() => {
                console.log("AudioContext resumed");
            });
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (isMuted) {
            initAudio();
            // Reset timing on unmute
            if (audioContextRef.current) {
                nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1;
            }
        }
        setIsMuted(prev => !prev);

        // Cleanup if muting
        if (!isMuted) {
            if (gainNodeRef.current && audioContextRef.current) {
                gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.1);
            }
            if (oscillatorRef.current) {
                oscillatorRef.current.stop();
                oscillatorRef.current = null;
            }
            isFlatliningRef.current = false;
        }
    }, [isMuted, initAudio]);

    // Play a single "Lub" or "Dub" sound with realistic synthesis
    const playSound = (time: number, type: 'lub' | 'dub') => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;

        // Master Filter (Chest Cavity Simulation)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 120; // Very deep muffling
        filter.connect(ctx.destination);

        // 1. Tonal Component (The "Boom")
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.connect(oscGain);
        oscGain.connect(filter);

        // "Lub" (S1) is deeper/longer, "Dub" (S2) is higher/tighter
        const baseFreq = type === 'lub' ? 60 : 90;
        const duration = type === 'lub' ? 0.15 : 0.10;
        const impact = type === 'lub' ? 1.0 : 0.8;

        // Pitch Drop (Simulates fluid/valve thump)
        osc.frequency.setValueAtTime(baseFreq, time);
        osc.frequency.exponentialRampToValueAtTime(baseFreq / 2, time + duration);
        osc.type = 'sine'; // Pure sine for the deep boom quality

        // Volume Envelope
        oscGain.gain.setValueAtTime(0, time);
        oscGain.gain.linearRampToValueAtTime(impact, time + 0.01); // Fast attack
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + duration); // Decay

        osc.start(time);
        osc.stop(time + duration + 0.1);

        // 2. Transients/Noise (The "Click" of valve closure) - adds realism
        const bufferSize = ctx.sampleRate * 0.1; // 0.1s noise
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        const noiseFilter = ctx.createBiquadFilter();

        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.value = 400; // Muffled noise

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination); // Bypass master filter for some high-end clarity

        // Noise Envelope (Very short)
        noiseGain.gain.setValueAtTime(0, time);
        noiseGain.gain.linearRampToValueAtTime(0.2, time + 0.005);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        noise.start(time);
        noise.stop(time + 0.05);

        // 3. Digital Monitor Beep (Synchronized with "Lub" / Systole)
        // Adjust based on reference: Needs to be sharper, higher, and very short "pip"
        if (type === 'lub') {
            const beepOsc = ctx.createOscillator();
            const beepGain = ctx.createGain();

            beepOsc.connect(beepGain);
            beepGain.connect(ctx.destination);

            // Medical Beep Standard (High pitch, very short)
            beepOsc.frequency.value = 1500; // High frequency "pip"
            beepOsc.type = 'sine';

            // Short, sharp envelope
            beepGain.gain.setValueAtTime(0, time);
            beepGain.gain.linearRampToValueAtTime(0.1, time + 0.005); // Fast attack
            beepGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05); // Very fast decay

            beepOsc.start(time);
            beepOsc.stop(time + 0.05);
        }
    };

    // Scheduler loop
    const scheduleBeats = useCallback(() => {
        if (!audioContextRef.current || isMuted || isFlatliningRef.current) return;

        const ctx = audioContextRef.current;
        const lookahead = 0.1; // How far ahead to schedule (seconds)

        // Smoothly interpolate current BPM towards target
        // Moves 5% of the way to target per frame
        currentBpmRef.current += (targetBpmRef.current - currentBpmRef.current) * 0.1; // Faster reaction

        // If stopped, maintain a resting heart rate (~60 BPM)
        // If scrolling really fast, cap at ~160 BPM

        while (nextNoteTimeRef.current < ctx.currentTime + lookahead) {
            const beatTime = nextNoteTimeRef.current;
            const secondsPerBeat = 60 / currentBpmRef.current;

            // Systole phase is roughly 0.3-0.4 of cycle, but fixed time works better for "thud-thud.....thud-thud"
            // "Lub" at 0.0
            playSound(beatTime, 'lub');

            // "Dub" follows "Lub" by a fixed interval (~0.3s for realistic adult heart) used in medicine, 
            // but scales slightly with heart rate.
            // At 60BPM (1s), 0.3s is good. At 120BPM (0.5s), 0.3s is tight.
            // Let's use a dynamic interval: ~30% of the beat duration.
            const systoleInterval = Math.max(0.2, secondsPerBeat * 0.35);

            playSound(beatTime + systoleInterval, 'dub');

            nextNoteTimeRef.current += secondsPerBeat;
        }

        requestRef.current = requestAnimationFrame(scheduleBeats);
    }, [isMuted]);

    // Start/Stop scheduling loop based on state
    useEffect(() => {
        if (!isMuted && !isFlatliningRef.current) {
            if (audioContextRef.current) {
                // Reset scheduler if starting fresh
                if (nextNoteTimeRef.current < audioContextRef.current.currentTime) {
                    nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1;
                }
            }
            requestRef.current = requestAnimationFrame(scheduleBeats);
        } else if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isMuted, scheduleBeats]);

    const startFlatline = useCallback(() => {
        if (isMuted || !audioContextRef.current || isFlatliningRef.current) return;

        const ctx = audioContextRef.current;
        const now = ctx.currentTime;

        // Stop the heartbeat scheduler
        if (requestRef.current) cancelAnimationFrame(requestRef.current);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Low "Idle" Hum
        osc.frequency.value = 40;
        osc.type = 'sine';

        // Very subtle fade in
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 2.0);

        osc.start(now);

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        isFlatliningRef.current = true;
    }, [isMuted]);

    const stopFlatline = useCallback(() => {
        if (isFlatliningRef.current && oscillatorRef.current && gainNodeRef.current && audioContextRef.current) {
            const now = audioContextRef.current.currentTime;
            gainNodeRef.current.gain.setTargetAtTime(0, now, 0.1);

            const oldOsc = oscillatorRef.current;
            setTimeout(() => {
                try { oldOsc.stop(); } catch (e) { }
            }, 200);

            oscillatorRef.current = null;
            isFlatliningRef.current = false;

            // Reset beat timer so we resume beating immediately
            if (audioContextRef.current) {
                nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1;
            }
            // Restart scheduler loop
            requestRef.current = requestAnimationFrame(scheduleBeats);
        }
    }, [scheduleBeats]);

    const processHeartbeat = useCallback((velocity: number) => {
        if (isMuted) return;

        const absVelocity = Math.abs(velocity);

        if (absVelocity > 10) {
            // Active Scrolling
            if (flatlineTimeoutRef.current) {
                clearTimeout(flatlineTimeoutRef.current);
                flatlineTimeoutRef.current = null;
            }

            stopFlatline();

            // Map velocity to BPM (Rest: 60, Max Scroll: 160)
            // Normalized velocity 0-2000 -> 0-1
            const intensity = Math.min(absVelocity / 2000, 1);
            targetBpmRef.current = 60 + (intensity * 100);

        } else {
            // Stopped/Slow
            targetBpmRef.current = 60; // Return to resting rate

            if (!flatlineTimeoutRef.current && !isFlatliningRef.current) {
                flatlineTimeoutRef.current = setTimeout(() => {
                    // Instead of flatline, let's just keep resting beat (user request: "no flatline" implied by "realistic")
                    // Or we can invoke startFlatline() if we want the hum. 
                    // User said "stopped it should sound like ECG wave stopped" previously,
                    // but recently said "not realistic". A real heart doesn't flatline when you stop running.
                    // I will maintain the Resting Beat (60 BPM) instead of flatlining.
                    // This feels much more natural and high-quality.

                    // If we *really* want the flatline effect, uncomment next line:
                    // startFlatline(); 
                }, 500);
            }
        }
    }, [isMuted, startFlatline, stopFlatline]);

    return { isMuted, toggleMute, processHeartbeat };
};
