"use server"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export async function register(prevState: any, formData: FormData) {
  try {
    const fullname = formData.get("fullname")
    const email = formData.get("email")
    const tel = formData.get("tel")
    const attachment = formData.get("attachment") as File
    const fileName = uuidv4()

    const cookieStore = cookies()
    const supabase = createClient()

    console.log("attachment: ", attachment)

    const attachmentError = await supabase.storage
      .from("attachments")
      .upload(fileName, attachment)

    if (attachmentError.error) {
      console.error("ERR: attachment", attachmentError.error)
      return { message: "Upload error" }
    }

    const publishAttachmentUrl = supabase.storage
      .from("attachments")
      .getPublicUrl(fileName)

    const { data, error: insertError } = await supabase.from("users").insert([
      {
        fullname,
        email,
        tel,
        attachment: publishAttachmentUrl.data.publicUrl,
      },
    ])

    if (insertError) {
      console.error("ERR insert: ", insertError)
      return { message: "Register error" }
    }

    return { success: true }
  } catch (error) {
    console.log("ERR: ", error)
    return { message: "Internal server error" }
  }
}
