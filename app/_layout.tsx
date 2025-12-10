import { ColorSchemeProvider } from "@/components/contexts/ColorSchemeContext";
import RootWrapper from "@/components/RootWrapper";

export default function RootLayout() {
  return(
    <ColorSchemeProvider>
      <RootWrapper />
    </ColorSchemeProvider>
  )
}
