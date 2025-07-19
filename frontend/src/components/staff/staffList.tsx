import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Settings, Mail } from "lucide-react"

type PermissionSet = {
  studentCreate: boolean
  studentRead: boolean
  studentUpdate: boolean
  studentDelete: boolean
}

interface Staff {
  _id: string | undefined
  name: string
  email: string
  role: string
  permissions?: {
    students: PermissionSet
  }
}

interface StaffListProps {
  staff: Staff[]
  loading: boolean
  onEdit: (staff: Staff) => void
  onDelete: (id: string) => void
  onManagePermissions: (staff: Staff) => void
}

export default function StaffList({
  staff,
  loading,
  onEdit,
  onDelete,
  onManagePermissions,
}: StaffListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (staff.length === 0) {
    return (
      <p className="text-gray-500 mt-20 text-center ">No staff members found</p>
    )
  }

  const getPermissionBadges = (permissions?: PermissionSet) => {
    const badges: string[] = []
    const perms = permissions
    if (perms?.studentCreate) badges.push("Create")
    if (perms?.studentRead) badges.push("Read")
    if (perms?.studentUpdate) badges.push("Edit")
    if (perms?.studentDelete) badges.push("Delete")
    return badges
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {staff.map((member: any) => {
        const permissionBadges = getPermissionBadges(member.permissions)

        return (
          <Card key={member._id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <Badge variant="secondary" className="w-fit text-xs mt-1">
                {member.role.replace("_", " ").toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600 break-all">
                  <Mail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Student Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {permissionBadges.length > 0 ? (
                      permissionBadges.map((perm) => (
                        <Badge key={perm} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500">No permissions</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(member)}
                  aria-label={`Edit ${member.name}`}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onManagePermissions(member)}
                  aria-label={`Manage permissions for ${member.name}`}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Permissions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(member._id)}
                  aria-label={`Delete ${member.name}`}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {/* Delete */}
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
