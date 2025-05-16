import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Import our reorganized CSS files
import "./styles/app.css";
import "./styles/base.css";
import "./styles/components/datagrid.css";
import "./styles/components/fileupload.css";
import "./styles/components/filterpanel.css";
import "./styles/components/lazyloadlist.css";
import "./styles/overrides/mantine.css";
import "./styles/themes/dark.css";
import "./styles/themes/light.css";
import "./styles/themes/variables.css";

// Import vysta-react styles
import "@datavysta/vysta-react/style.css";
// Import Mantine styles (optional but recommended)
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(<App />);
