import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

type Post = {
  id: string;
  title: string;
};

const fetchPosts = async (s: string): Promise<Post[]> => {
  try {
    const response = await fetch(s);
    const data = await response.json();
    return data;
  } catch (e) {
    return [];
  }
};

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    console.log('fetching');
    fetchPosts('/api/posts')
      .then((data) => {
        console.log('fetched posts');
        setPosts(data);
      })
      .catch((err) => {
        console.error('Error fetching', err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
