"use client";

import { useOptimistic, useState, useTransition, use, Suspense } from 'react';
import styles from './styles.module.css';

// --- Sub-component for use() demo ---
// This component "suspends" until the promise resolves.
function MessageContainer({ messagePromise }) {
    // The 'use' hook unwraps the promise. 
    // If the promise is pending, it throws (suspends).
    // If removed, it returns the value.
    const message = use(messagePromise);

    return <div className={styles.promiseResult}>{message}</div>;
}

export default function React19Demo() {
    // --- Optimistic UI State ---
    const [messages, setMessages] = useState([
        { text: "Hello there!", sending: false },
        { text: "This is a pre-loaded message", sending: false }
    ]);

    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
        messages,
        (state, newMessage) => [
            ...state,
            { text: newMessage, sending: true }
        ]
    );

    const [isPending, startTransition] = useTransition();

    async function sendMessage(formData) {
        const text = formData.get("message");
        addOptimisticMessage(text);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        startTransition(() => {
            setMessages(currentMessages => [
                ...currentMessages,
                { text: text, sending: false }
            ]);
        });
    }

    // --- use() Hook State ---
    const [promise, setPromise] = useState(null);

    const loadRandomQuote = () => {
        // Creating a promise that resolves after 1.5s
        const newPromise = new Promise(resolve => {
            setTimeout(() => {
                const quotes = [
                    "React 19 is amazing!",
                    "The use() hook simplifies data fetching.",
                    "Server Components + Client Actions = Power.",
                    "Suspense makes loading states declarative."
                ];
                resolve(quotes[Math.floor(Math.random() * quotes.length)]);
            }, 1500);
        });
        setPromise(newPromise);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>React 19 Features</h1>

            {/* SECTION 1: useOptimistic */}
            <h2 className={styles.subTitle}>1. useOptimistic Demo</h2>
            <p className={styles.description}>
                Type a message and hit Enter. The message will appear <strong>instantly</strong> (Optimistic Update) with a "Sending..." opacity.
                This uses <code>useOptimistic</code> to manage temporary state.
            </p>

            <div className={styles.features}>
                <h3>Key Concept: Optimistic Updates</h3>
                <ul>
                    <li><strong>Immediate Feedback</strong>: UI updates before the server responds.</li>
                    <li><strong>Automatic Rollback</strong>: If the action fails (or finishes), React switches back to the source of truth.</li>
                </ul>
            </div>

            <div className={styles.chatBox}>
                {optimisticMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${msg.sending ? styles.sending : ''}`}
                    >
                        {msg.text}
                        {msg.sending && <span className={styles.statusIcon}>🕒</span>}
                    </div>
                ))}
            </div>

            <form action={sendMessage} className={styles.form}>
                <input
                    name="message"
                    type="text"
                    placeholder="Type a message..."
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button} disabled={isPending}>
                    Send
                </button>
            </form>

            <hr className={styles.divider} />

            {/* SECTION 2: use() Hook */}
            <h2 className={styles.subTitle}>2. use() Hook Demo</h2>
            <p className={styles.description}>
                Click the button below to load a quote. We create a Promise and pass it to a child component.
                The child uses <code>use(promise)</code> to unwrap it, triggering a <code>Suspense</code> fallback automatically while waiting.
            </p>

            <div className={styles.features}>
                <h3>Key Concept: The use() API</h3>
                <ul>
                    <li><strong>Unwrap Promises</strong>: Read the value of a Promise directly in fetch/render.</li>
                    <li><strong>Conditional/Loops</strong>: Unlike other hooks, <code>use()</code> can be called conditionally.</li>
                    <li><strong>Suspense Integration</strong>: Automatically triggers nearest Suspense boundary while pending.</li>
                </ul>
            </div>

            <div className={styles.promiseBox}>
                {promise ? (
                    <Suspense fallback={<span className={styles.spinner}>Loading quote...</span>}>
                        <MessageContainer messagePromise={promise} />
                    </Suspense>
                ) : (
                    <span style={{ color: 'var(--color-text-muted)' }}>No quote loaded yet.</span>
                )}

                <button onClick={loadRandomQuote} className={styles.button}>
                    {promise ? "Load Another" : "Load Quote"}
                </button>
            </div>
        </div>
    );
}
