"use client"

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

export default function UserManagement() {
  const supabase = createClient()
  const [users, setUsers] = useState<any>([])
  const [searchUser, setSearchUser] = useState("")
  const itemPerPage = 2
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const userSupabaseQuery = () => {
    let query = supabase.from("users").select("*", { count: "exact" })
    if (searchUser) {
      query = query.like("fullname", `%${searchUser}%`)
    }
    query = query.range((page - 1) * itemPerPage, page * itemPerPage - 1)
    return query
  }

  const fetchUsers = async () => {
    let { data, error, count } = await userSupabaseQuery()

    if (error || !data) {
      console.error("ERR: ", error)
      return
    }
    setUsers(data)
    count = count || 1
    const calculateMaxPage = Math.ceil(count / itemPerPage)
    setMaxPage(calculateMaxPage)
  }
  useEffect(() => {
    fetchUsers()
  }, [page])

  const handleSearch = (e: any) => {
    setSearchUser(e.target.value)
  }

  const search = async () => {
    let { data, error, count } = await userSupabaseQuery()

    // Filters
    //   .eq("column", "Equal to")
    //   .gt("column", "Greater than")
    //   .lt("column", "Less than")
    //   .gte("column", "Greater than or equal to")
    //   .lte("column", "Less than or equal to")
    //   .ilike("column", "%CaseInsensitive%")
    //   .is("column", null)
    //   .in("column", ["Array", "Values"])
    //   .neq("column", "Not equal to")

    // Arrays
    //   .contains("array_column", ["array", "contains"])
    //   .containedBy("array_column", ["contained", "by"])

    console.log("searchUser: ", searchUser, data)

    if (error) {
      alert("Fail to search user")
      console.error("ERR: ", error)
      return
    }
    setPage(1)
    count = count || 1
    const calculateMaxPage = Math.ceil(count / itemPerPage)
    setMaxPage(calculateMaxPage)
    setUsers(data)
  }

  return (
    <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 px-3">
      <div className="flex gap-2 items-center">
        <input
          onChange={handleSearch}
          className="rounded-md px-4 py-2 bg-inherit border w-full"
          type="text"
        />
        <button onClick={search}>Search</button>
      </div>
      <main className="flex-1 flex flex-col gap-6">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Full Name</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Telephone</th>
              <th className="border border-gray-200 px-4 py-2">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.tel}</td>
                <td>
                  {user.attachment && (
                    <a href={user.attachment}>Download file</a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-5 flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm ">
            Page {page} / {maxPage}
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            {page > 1 && (
              <button
                className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
            )}

            {page < maxPage && (
              <button
                className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
