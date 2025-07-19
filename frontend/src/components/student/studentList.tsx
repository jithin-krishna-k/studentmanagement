import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Mail, Phone } from "lucide-react"

interface Student {
  _id: string
  name: string
  email: string
  phone: string
  grade: string
  age: number
  address: string
}

interface StudentListProps {
  students: Student[]
  loading: boolean
  onEdit?: (student: Student) => void
  onDelete?: (id: string) => void
  canUpdate?: boolean
  canDelete?: boolean
}

export default function StudentList({ students, loading, onEdit, onDelete, canUpdate, canDelete }: StudentListProps) {
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

  if (students.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">No students found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student) => (
        <Card key={student._id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{student.name}</CardTitle>
            <p className="text-sm text-gray-600">
              Grade {student.grade} • Age {student.age}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {student.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {student.phone}
              </div>
              <p className="text-sm text-gray-600">{student.address}</p>
            </div>
            {(canUpdate || canDelete) && (
              <div className="flex gap-2">
                {canUpdate && onEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEdit(student)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                )}
                {canDelete && onDelete && (
                  <Button variant="outline" size="sm" onClick={() => onDelete(student._id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
