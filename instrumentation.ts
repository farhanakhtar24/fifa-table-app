export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureDb } = await import("./src/db/ensure");
    ensureDb();
  }
}
