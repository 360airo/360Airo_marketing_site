const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');
code = code.replace(/from '\.\//g, "from '../");
code = code.replace(/import '\.\/styles/g, "import '../styles");
code = code.replace("export default function App", "export default function Home");
fs.writeFileSync('src/pages/Home.jsx', code);
