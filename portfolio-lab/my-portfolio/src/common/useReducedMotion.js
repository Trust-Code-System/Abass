'use client';
import { useSyncExternalStore } from 'react';

function subscribe(onChange) {
	const query = window.matchMedia('(prefers-reduced-motion: reduce)');
	query.addEventListener('change', onChange);
	return () => query.removeEventListener('change', onChange);
}
const getSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerSnapshot = () => false;

// The hydration snapshot must match the server; CSS handles the preference before hydration.
export default function useReducedMotion() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
