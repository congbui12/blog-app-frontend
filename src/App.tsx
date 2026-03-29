import '@radix-ui/themes/styles.css';
import './App.css';
import AppRoutes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { ToastProvider } from './contexts/toast/ToastProvider';
import { Theme } from '@radix-ui/themes';

const queryClient = new QueryClient();

function App() {
  return (
    <Theme
      accentColor="blue" // Màu chủ đạo cho toàn app (Spinner, Button...)
      grayColor="slate" // Tông màu xám (Text, Background)
      panelBackground="translucent" // Làm cho Dialog/Overlay có hiệu ứng mờ (glass)
      radius="medium" // Bo góc mặc định cho toàn bộ Component
      scaling="100%" // Tỉ lệ kích thước
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Theme>
  );
}

export default App;
