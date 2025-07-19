import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { updateStaffPermissions } from "@/api/staff"

interface PermissionsFlat {
  studentCreate: boolean
  studentRead: boolean
  studentUpdate: boolean
  studentDelete: boolean
}

interface StaffType {
  _id: string
  name: string
  permissions?: PermissionsFlat
}

interface PermissionManagerProps {
  staff: StaffType
  onClose: () => void
  onSave?: () => void
}

const PERMISSION_KEYS = [
  { key: "studentCreate", label: "Create" },
  { key: "studentRead", label: "Read" },
  { key: "studentUpdate", label: "Update" },
  { key: "studentDelete", label: "Delete" },
] as const

export default function PermissionManager({ staff, onClose, onSave }: PermissionManagerProps) {
  const [permissions, setPermissions] = useState<PermissionsFlat>({
    studentCreate: false,
    studentRead: false,
    studentUpdate: false,
    studentDelete: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    console.log("staff.permissions", staff?.permissions);
    if (staff?.permissions) {
      setPermissions(staff.permissions)
    }
  }, [staff])

  const handleChange = (key: keyof PermissionsFlat, checked: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await updateStaffPermissions(staff._id, permissions)
      toast.success("Permissions updated successfully")
      if (onSave) onSave()
      onClose()
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to update permissions"
      setError(msg)
      toast.error("Update failed", { description: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <h3 className="text-lg font-medium mb-4">Manage Permissions for {staff.name}</h3>

        <div className="space-y-4">
          <Label className="text-base font-medium">Student Permissions</Label>
          <div className="mt-2 space-y-2">
            {PERMISSION_KEYS.map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={permissions[key]}
                  onCheckedChange={(checked) =>
                    handleChange(key, checked as boolean)
                  }
                />
                <Label htmlFor={key}>{label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Permissions"}
        </Button>
      </div>
    </form>
  )
}
