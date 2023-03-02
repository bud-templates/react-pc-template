import React, { Component, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  text?: string
  children?: React.ReactNode
}
interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}
class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO 接报警系统
    this.setState({ error, errorInfo })
  }

  handleReload = () => {
    this.setState({
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.error) {
      const { text } = this.props
      return (
        <div>
          出错了，你可以尝试
          <button onClick={this.handleReload}>
            {text ? text : '重新加载'}
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
