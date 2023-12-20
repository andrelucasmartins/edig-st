import Robots from "@/app/robots"

describe("Generate Robots txt", () => {
  it("generates correct robots.txt content for production environment", () => {
    const originalEnv = process.env
    process.env = { ...originalEnv, NEXT_PUBLIC_VERCEL_URL: "http://localhost:3000" }

    const expectedContent = {
      host: "http://localhost:3000",
      rules: [{ userAgent: "*" }],
      sitemap: "http://localhost:3000/sitemap.xml",
    }

    const generatedContent = Robots()
    expect(generatedContent).toEqual(expectedContent)

    process.env = originalEnv
  })

  it("generates correct robots.txt content for local development environment", () => {
    const originalEnv = process.env
    process.env = { ...originalEnv, NEXT_PUBLIC_VERCEL_URL: "localhost:3000" }

    const expectedContent = {
      host: "http://localhost:3000",
      rules: [{ userAgent: "*" }],
      sitemap: "http://localhost:3000/sitemap.xml",
    }

    const generatedContent = Robots()
    expect(generatedContent).toEqual(expectedContent)
  })
})
