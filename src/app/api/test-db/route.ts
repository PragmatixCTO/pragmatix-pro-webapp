import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    await prisma.$connect()
    return NextResponse.json({ message: "Database connection successful" }, { status: 200 })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ message: "Database connection failed" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}