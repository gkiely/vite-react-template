import { fireEvent, render, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from './App';

const posts = [
  {
    id: '1',
    title: 'hello',
  },
];

export const restHandlers = [
  rest.get('http://localhost:8080/api/posts', (_req, res, ctx) => {
    console.log('rest handler');
    return res(ctx.status(200), ctx.json(posts));
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe('App', () => {
  it('should render', async () => {
    console.log('ran');
    render(<App />);
    expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('count is: 1')).toBeInTheDocument();
  });
});
