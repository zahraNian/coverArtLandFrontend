'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResponsiveModal } from '@/components/ui/responsive-modal'
import { useAuthStore } from '@/store/auth'
import { showToast } from '@/lib/toast'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { login, register, loading } = useAuthStore()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [accepted, setAccepted] = useState(true)

  const isStrongPassword = (pwd: string) => {
    // min 8 chars, uppercase, lowercase, number, special
    const lengthOk = pwd.length >= 8
    const upperOk = /[A-Z]/.test(pwd)
    const lowerOk = /[a-z]/.test(pwd)
    const numOk = /\d/.test(pwd)
    const specialOk = /[^A-Za-z0-9]/.test(pwd)
    return lengthOk && upperOk && lowerOk && numOk && specialOk
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (mode === 'signup') {
        if (!isStrongPassword(password)) {
          showToast('Password must be at least 8 chars and include upper, lower, number, and special character.', 'error')
          return
        }
        if (password !== passwordConfirm) {
          showToast('Passwords do not match.', 'error')
          return
        }
        await register(email, password, passwordConfirm)
        showToast('Registration successful.', 'success')
      } else {
        await login(email, password)
        showToast('Logged in successfully.', 'success')
      }
      onOpenChange(false)
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong'
      showToast(msg, 'error')
    } finally {
    }
  }

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onOpenChange}
      title={mode === 'login' ? 'Sign in' : 'Sign up'}
      description={
        mode === 'login'
          ? 'Access your account to continue.'
          : 'Create a new account to get started.'
      }
      footer={
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {mode === 'login' ? "Don't have an account?" : 'Already registered?'}
          </p>
          <Button
            variant="link"
            className="px-1"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {mode === 'signup' && (
            <p className="text-xs text-muted-foreground">
              Must be 8+ chars with upper, lower, number and special.
            </p>
          )}
        </div>
        {mode === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="passwordConfirm">Confirm password</Label>
            <Input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <input
            id="tos"
            type="checkbox"
            className="h-4 w-4"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <Label htmlFor="tos" className="text-sm font-normal">
            I agree to{' '}
            <Link href="/terms" target="_blank" className="underline">Terms of Service</Link>{' '}and{' '}
            <Link href="/privacy" target="_blank" className="underline">Privacy Policy</Link>
          </Label>
        </div>
        <Button type="submit" disabled={loading || !accepted}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Sign up'}
        </Button>
      </form>
    </ResponsiveModal>
  )
}