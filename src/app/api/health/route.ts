import { NextResponse } from "next/server";

/**
 * Health check endpoint for container orchestration
 * Used by Docker, Kubernetes, load balancers, etc.
 */
export async function GET() {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  return NextResponse.json(health);
}

