'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/login/login.module.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email required';
        } else if (!EMAIL_REGEX.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password required';
        } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
            newErrors.password = 'Min 6 characters';
        }

        return newErrors;
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});
        setSubmitError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (rememberMe) {
                sessionStorage.setItem('rememberEmail', formData.email);
            } else {
                sessionStorage.removeItem('rememberEmail');
            }

            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            setSubmitError('Connection failed. Try again.');
        } finally {
            setIsLoading(false);
        }
    }, [formData, rememberMe, validateForm]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }, [errors]);

    return (
        <div className={styles.container}>
            {/* Organic Background Elements */}
            <div className={styles.bgOrb} style={{ '--delay': '0s' }}></div>
            <div className={styles.bgOrb} style={{ '--delay': '2s' }}></div>
            <div className={styles.bgOrb} style={{ '--delay': '4s' }}></div>

            {/* Left Diagonal Section */}
            <div className={styles.leftSection} aria-hidden="true">
                <div className={styles.textDecoration}>
                    <span>Create</span>
                    <span>Design</span>
                    <span>Build</span>
                </div>
            </div>

            {/* Main Card */}
            <div className={styles.card}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome.</h1>
                    <p className={styles.subtitle}>Sign in to your account</p>
                </div>

                {/* Error Alert */}
                {submitError && (
                    <div className={styles.alertError} role="alert">
                        {submitError}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    <div className={styles.formGroup}>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                            <span id="email-error" className={styles.errorMessage}>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.passwordContainer}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? 'password-error' : undefined}
                            />
                            <button
                                type="button"
                                className={styles.eyeToggle}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                tabIndex={0}
                            >
                                {showPassword ? '○' : '●'}
                            </button>
                        </div>
                        {errors.password && (
                            <span id="password-error" className={styles.errorMessage}>
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/* Options Row */}
                    <div className={styles.optionsRow}>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>Remember me</span>
                        </label>
                        <Link href="/forgot-password" className={styles.forgotLink}>
                            Forgot?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isLoading}
                        aria-busy={isLoading}
                    >
                        <span className={styles.btnText}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </span>
                    </button>
                </form>

                {/* Divider */}
                <div className={styles.divider}></div>

                {/* Footer */}
                <p className={styles.footer}>
                    New here?{' '}
                    <Link href="/register" className={styles.signupLink}>
                        Create account
                    </Link>
                </p>
            </div>

            {/* Floating Accent */}
            <div className={styles.floatingAccent}></div>
        </div>
    );
}
