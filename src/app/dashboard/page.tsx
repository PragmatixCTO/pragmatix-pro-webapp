'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

export default function Dashboard() {
  const { session, status } = useAuth()

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return null // This should not happen due to our AuthProvider, but just in case
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name || 'User'}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>1-1 Sessions</CardTitle>
            <CardDescription>Remaining sessions: 3</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Book a Session</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mock Interviews</CardTitle>
            <CardDescription>Remaining interviews: 2</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Schedule Interview</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resume Reviews</CardTitle>
            <CardDescription>Remaining reviews: 1</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Submit Resume</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}