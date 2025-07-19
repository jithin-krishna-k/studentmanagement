import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Alert, AlertDescription } from "../ui/alert"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { createStaff, updateStaff } from "@/api/staff"
import { toast } from "sonner"
import type { StaffType } from "@/lib/type"

interface StaffFormProps {
  staff?: StaffType
  onClose: () => void
  onSave: () => void
}

export default function StaffForm({ staff, onClose, onSave }: StaffFormProps) {
  const [formData, setFormData] = useState<Omit<StaffType, "_id" | "role">>({
    name: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        email: staff.email || "",
        password: "",
      })
    }
  }, [staff])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const staffData: StaffType = {
        ...formData,
        password: formData.password || "",
        role: "Staff",
      }
      if (staff) {
        if (!formData.password) {
          delete staffData.password
        }
        await updateStaff(staff._id!, staffData)
        toast.success("Staff updated successfully")
        onSave()
      } else {
        await createStaff({
          name: formData.name,
          email: formData.email,
          password: formData.password || "",
        })
        toast.success("Staff created successfully")
        onSave()
      }

      onClose()
    } catch (err: string | any) {
      setError(err.response?.data?.message || err.message || "Operation failed")
      toast.error("Error", {
        description: err.response?.data?.message || err.message || "Operation failed",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password {staff && "(leave empty to keep current)"}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required={!staff}
        />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : staff ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  )
}
