
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Import vysta-react styles
import '@datavysta/vysta-react/style.css'
// Import Mantine styles (optional but recommended)
import '@mantine/core/styles.css'

createRoot(document.getElementById("root")!).render(<App />);
