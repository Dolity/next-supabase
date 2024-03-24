import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/middleware"

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request)
    await supabase.auth.getSession()
    if (request.nextUrl.pathname.includes("user")) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    }

    return response
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: ["/login", "/user"],
}
