// src/app/api/admin/sessions/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import type { Session } from 'next-auth'

const prisma = new PrismaClient()

// Define the type for the booking session with included user data
type BookingSessionWithUser = Prisma.BookingSessionGetPayload<{
  include: {
    user: {
      select: {
        name: true
      }
    }
  }
}>

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null
    
    if (!session?.user?.role || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use the correct model name as defined in the Prisma schema
    const bookingSessions = await prisma.bookingSession.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    }) as BookingSessionWithUser[]

    const formattedSessions = bookingSessions.map(bookingSession => ({
      id: bookingSession.id,
      userId: bookingSession.userId,
      type: bookingSession.type,
      status: bookingSession.status,
      scheduledFor: bookingSession.scheduledFor,
      userName: bookingSession.user.name,
    }))

    return NextResponse.json(formattedSessions)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}