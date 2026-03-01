import { useEffect } from 'react';

export const useBatAnimation = () => {
    useEffect(() => {
        // Check performance - disable for low end devices
        const isLowEndDevice = () => {
            // Basic check: hardwareConcurrency and deviceMemory (if available)
            if (typeof navigator !== 'undefined') {
                const cores = navigator.hardwareConcurrency || 4;
                const memory = navigator.deviceMemory || 4;
                return cores < 4 || memory < 4;
            }
            return false;
        };

        if (isLowEndDevice()) {
            console.log('Low performance device detected - Bat animation disabled for optimization.');
            return;
        }

        const handleGlobalClick = (e) => {
            // Create bat container
            const numBats = Math.floor(Math.random() * 3) + 2; // 2 to 4 bats

            for (let i = 0; i < numBats; i++) {
                const bat = document.createElement('div');
                bat.className = 'bat-particle';

                // Randomize initial position slightly around the cursor
                const offsetX = (Math.random() - 0.5) * 40;
                const offsetY = (Math.random() - 0.5) * 40;

                bat.style.left = `${e.clientX + offsetX}px`;
                bat.style.top = `${e.clientY + offsetY}px`;

                // Randomize flight path (tx, ty) and rotation
                const tx = (Math.random() - 0.5) * 200;
                const ty = -100 - Math.random() * 100;
                const rot = (Math.random() - 0.5) * 60;

                bat.style.setProperty('--tx', `${tx}px`);
                bat.style.setProperty('--ty', `${ty}px`);
                bat.style.setProperty('--rot', `${rot}deg`);

                document.body.appendChild(bat);

                // Destroy bat after animation
                setTimeout(() => {
                    if (document.body.contains(bat)) {
                        document.body.removeChild(bat);
                    }
                }, 800); // 0.8s matches animation duration
            }
        };

        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, []);
};
