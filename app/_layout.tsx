import { AuthProvider } from "@/components/contexts/AuthProvider";
import { ColorSchemeProvider } from "@/components/contexts/ColorSchemeContext";
import RootWrapper from "@/components/RootWrapper";

export default function RootLayout() {
  return(
    <ColorSchemeProvider>
      <AuthProvider>
        <RootWrapper />
      </AuthProvider>
    </ColorSchemeProvider>
  )
}
