export default function MyAccount(user) {
  if (!user) {
    return (
      <div className="p-4 text-center text-sm text-gray-500 border rounded-xl bg-gray-50">
        کاربری وارد نشده است
      </div>
    )
  }

  const joinDate = (user as any).joinedAt || (user as any).createdAt
  const formattedDate = joinDate;

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-lg">
        {user.name?.[0]?.toUpperCase() ?? "?"}
      </div>
      <div>
        <div className="text-base font-semibold text-gray-800">
          {user.name}
        </div>
        <div className="text-sm text-gray-500">
          Join Date: {formattedDate}
        </div>
      </div>
    </div>
  )
}