import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console for diagnostic reporting
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] w-full flex items-center justify-center p-6 sm:p-12 bg-[var(--color-bg)] font-[var(--font-sans)] text-[var(--color-charcoal)]">
          <div className="max-w-md w-full bg-[var(--color-white)] rounded-[28px] border border-[var(--color-border)] p-8 sm:p-10 shadow-lg text-center relative overflow-hidden">
            {/* Top Accent Dot */}
            <div className="w-12 h-12 rounded-full bg-[var(--color-tile)] border border-[var(--color-gold)]/30 mx-auto flex items-center justify-center mb-5 text-[var(--color-charcoal)]">
              <svg
                className="w-6 h-6 stroke-[1.75]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <span className="section-label text-[11px] block mb-2">SpaceDesk System</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[var(--color-charcoal)] mb-3 tracking-tight">
              Something went wrong
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text)] mb-8 leading-relaxed">
              We encountered an unexpected issue while rendering this section. You can try recovering or reloading the page.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="btn-primary-hover py-3 px-6 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={this.handleReload}
                className="py-3 px-5 rounded-full border border-[var(--color-border)] text-[var(--color-charcoal)] hover:bg-[var(--color-bg)] font-semibold text-xs transition-colors cursor-pointer"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
