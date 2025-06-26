import { Component, type ErrorInfo, type ReactNode } from 'react';
import GlassCard from './GlassCard';
import GlassButton from './GlassButton';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
          <GlassCard className="max-w-md text-center">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-2xl font-bold text-white mb-4">出错了</h2>
            <p className="text-white/70 mb-6">
              应用程序遇到了一个错误。请刷新页面重试。
            </p>
            <div className="space-y-3">
              <GlassButton
                variant="primary"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                刷新页面
              </GlassButton>
              <GlassButton
                variant="secondary"
                onClick={() => this.setState({ hasError: false })}
                className="w-full"
              >
                重试
              </GlassButton>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-white/60 cursor-pointer">错误详情</summary>
                <pre className="text-xs text-red-300 mt-2 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
