import { router } from '../router';
import { LoggerService } from '../services';

router.register('auth', 'login', async (payload) => {
  LoggerService.info('Handling login', payload);
  // simulate logic
  return { token: 'mock-token', user: { id: 1, name: 'Test User' } };
});

router.register('auth', 'logout', async () => {
  LoggerService.info('Handling logout');
  return { success: true };
});
