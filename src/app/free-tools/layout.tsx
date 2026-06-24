import { FreeToolsAuthProvider } from "../contexts/FreeToolsAuthContext";
import "../../styles/free-tools.css";

export default function FreeToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <FreeToolsAuthProvider>
      <div className="ft-site">{children}</div>
    </FreeToolsAuthProvider>
  );
}
