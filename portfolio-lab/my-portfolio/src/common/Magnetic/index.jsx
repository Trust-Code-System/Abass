'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
export default function Magnetic({ children }) {
	const magnetic = useRef(null);
	useEffect(() => {
		const context = gsap.matchMedia();
		context.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
			const node = magnetic.current;
			const xTo = gsap.quickTo(node, 'x', { duration: .5, ease: 'power3.out' });
			const yTo = gsap.quickTo(node, 'y', { duration: .5, ease: 'power3.out' });
			const move = (e) => { const box = node.getBoundingClientRect(); xTo((e.clientX - box.left - box.width / 2) * .2); yTo((e.clientY - box.top - box.height / 2) * .2); };
			const reset = () => { xTo(0); yTo(0); };
			node.addEventListener('pointermove', move); node.addEventListener('pointerleave', reset); node.addEventListener('focus', reset);
			return () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', reset); node.removeEventListener('focus', reset); xTo.tween.kill(); yTo.tween.kill(); gsap.set(node, { x: 0, y: 0 }); };
		});
		return () => context.revert();
	}, []);
	return React.cloneElement(children, { ref: magnetic });
}
