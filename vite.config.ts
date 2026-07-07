import { execSync } from "child_process"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

function commitSha(): string {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim()
  } catch {
    return (process.env.GITHUB_SHA ?? "dev").slice(0, 7)
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: "/mifare/",
  define: {
    __COMMIT_SHA__: JSON.stringify(commitSha()),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
