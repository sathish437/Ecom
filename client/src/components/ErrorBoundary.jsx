import React from 'react';
import Button from './ui/Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-bg-main text-text-primary p-4">
                    <div className="glass-card p-8 rounded-2xl max-w-lg w-full text-center border border-red-500/30">
                        <h1 className="text-3xl font-bold mb-4 text-red-500">Something went wrong</h1>
                        <p className="text-text-muted mb-6">
                            We apologize for the inconvenience. An unexpected error has occurred.
                        </p>
                        <div className="bg-black/30 p-4 rounded-lg mb-6 text-left overflow-auto max-h-40 text-xs font-mono text-red-300">
                            {this.state.error && this.state.error.toString()}
                        </div>
                        <Button onClick={this.handleReset} className="w-full">
                            Return to Home
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
