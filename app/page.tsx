"use client"

import { register } from "./action"
import { useFormState } from "react-dom"

const initialState = {
  success: false as boolean,
  message: null,
}

export default function Index() {
  const [state, formAction] = useFormState(register, initialState)
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="mt-4">
          <form action={formAction}>
            <h1 className="mb-2">Register Form</h1>

            <div className="flex gap-2 items-center">
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-2 w-full"
                type="text"
                name="fullname"
                placeholder="ex. John Doe"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-2 w-full"
                type="email"
                name="email"
                placeholder="ex. you@email.com"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-2 w-full"
                type="text"
                name="tel"
                placeholder="ex. 0812345678"
                required
              />
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-2 w-full"
                type="file"
                name="attachment"
              />
            </div>
            <button
              type="submit"
              className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 w-full"
            >
              Register
            </button>

            {state.message && <div>Error: {state.message}</div>}
            {state.success && (
              <div className="bg-green-500 p-4">Register Success</div>
            )}
          </form>
        </main>
      </div>
    </div>
  )
}
