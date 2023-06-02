// TestComponent.js
import { useSelector } from "react-redux";

const TestComponent = () => {
  const testValue = useSelector((state) => state.test.value);

  return (
    <div>
      <h1>Тестовый компонент</h1>
      <h2>Значение из Redux: {testValue}</h2>
    </div>
  );
};

export default TestComponent;
