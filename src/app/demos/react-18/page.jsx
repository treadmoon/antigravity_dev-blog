"use client";

import { useState, useTransition, useDeferredValue, memo } from 'react';
import styles from './styles.module.css';

// Generate a large list of dummy items
const generateItems = () => {
    const items = [];
    for (let i = 0; i < 5000; i++) {
        items.push(`Item ${i + 1} - ${Math.random().toString(36).substring(7)}`);
    }
    return items;
};

const ITEMS = generateItems();

// Helper to simulate heavy CPU work
const simulateHeavyWork = (ms) => {
    const startTime = performance.now();
    while (performance.now() - startTime < ms) {
        // Block main thread
    }
};

// A component that mimics a heavy render (e.g. complex chart/list)
const HeavyList = memo(({ items, query, delay = 50 }) => {
    // Simulate slow rendering for THIS component
    simulateHeavyWork(delay);

    // Filter items (this part is usually fast, but we added the delay above)
    const filtered = items || ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    const displayItems = filtered.slice(0, 100);

    return (
        <div className={styles.list}>
            {displayItems.map((item, index) => (
                <div key={index} className={styles.listItem}>{item}</div>
            ))}
            {filtered.length === 0 && <p style={{ padding: '0.5rem' }}>No matches found.</p>}
            {filtered.length > 100 && <div style={{ padding: '0.5rem', color: 'gray' }}>...and {filtered.length - 100} more</div>}
            <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: '#999', borderTop: '1px dashed #eee', marginTop: '0.5rem' }}>
                (Simulated render lag: {delay}ms)
            </div>
        </div>
    );
});

export default function React18Demo() {
    // --- useTransition State ---
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(ITEMS);
    const [isPending, startTransition] = useTransition();

    // --- useDeferredValue State ---
    const [deferredInput, setDeferredInput] = useState('');
    const deferredQuery = useDeferredValue(deferredInput);


    const handleChangeTransition = (e) => {
        const value = e.target.value;
        setQuery(value); // Urgent

        startTransition(() => {
            // Transition update
            const filtered = ITEMS.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>React 18 Features</h1>

            {/* SECTION 1: useTransition */}
            <h2 className={styles.subTitle}>1. useTransition Demo</h2>
            <p className={styles.description}>
                Type rapidly below. We artificially slow down the list rendering.
                Without <code>useTransition</code>, typing would freeze. With it, the input remains responsive while the list updates in the background.
            </p>

            <div className={styles.features}>
                <h3>Key Concept: Transitions</h3>
                <ul>
                    <li><strong>Urgent updates</strong>: Typing, hovering, clicking (Input value).</li>
                    <li><strong>Transition updates</strong>: UI views, large lists (Filtered results).</li>
                </ul>
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    value={query}
                    onChange={handleChangeTransition}
                    placeholder="Filter using useTransition..."
                    className={styles.input}
                />
                {isPending && <span className={styles.spinner}>Updating...</span>}
            </div>

            {/* Using HeavyList here to prove useTransition keeps input responsive despite slow render */}
            <div style={{ opacity: isPending ? 0.7 : 1 }}>
                <HeavyList items={filteredItems} delay={100} query="" />
            </div>

            <hr className={styles.divider} />

            {/* SECTION 2: useDeferredValue */}
            <h2 className={styles.subTitle}>2. useDeferredValue Demo</h2>
            <p className={styles.description}>
                Type below. The <code>useDeferredValue</code> hook defers the value passed to the heavy list.
                The input updates instantly, but the list (which takes 100ms to render) lags behind without blocking your typing.
            </p>

            <div className={styles.features}>
                <h3>Key Concept: Deferred Values</h3>
                <ul>
                    <li>Pass a deferred version of the input text to the slow component.</li>
                    <li>React attempts to render with the new value in the background.</li>
                    <li>If new input arrives, it abandons the old render and starts over with the new value.</li>
                </ul>
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    value={deferredInput}
                    onChange={(e) => setDeferredInput(e.target.value)}
                    placeholder="Filter using useDeferredValue..."
                    className={styles.input}
                />
            </div>

            <div style={{ opacity: deferredInput !== deferredQuery ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                {/* We pass the DEFERRED query to the heavy list */}
                <HeavyList query={deferredQuery} items={ITEMS} delay={100} />
            </div>

        </div>
    );
}
