// 简单的测试文件，用于验证应用是否能正常运行
import { AppProvider } from './context/AppContext';
import { useApp } from './hooks/useApp';

function TestComponent() {
  const { transactions, addTransaction } = useApp();
  
  const handleAddTest = () => {
    addTransaction({
      amount: 100,
      category: '💼',
      description: '测试交易',
      date: new Date().toISOString().split('T')[0],
      type: 'income'
    });
  };

  return (
    <div>
      <h1>应用测试</h1>
      <p>交易数量: {transactions.length}</p>
      <button onClick={handleAddTest}>添加测试交易</button>
    </div>
  );
}

export function TestApp() {
  return (
    <AppProvider>
      <TestComponent />
    </AppProvider>
  );
}
