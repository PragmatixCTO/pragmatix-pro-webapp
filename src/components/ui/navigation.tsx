'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

const Navigation = () => {
  const pathname = usePathname()
  const { session, status } = useAuth()

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div className="flex space-x-4">
        <Link
          href="/"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Home
        </Link>
        {status === 'authenticated' && (
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Dashboard
          </Link>
        )}
      </div>
      <div className="flex space-x-4">
        {status === 'authenticated' ? (
          <>
            <span className="text-sm font-medium">Welcome, {session?.user?.name || 'User'}</span>
            <Button variant="ghost" onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/login" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/register" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navigation