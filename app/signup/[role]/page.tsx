import { notFound } from 'next/navigation'

import SignupForm from './signup-form'

const ROLES = ['company', 'worker'] as const

export function generateStaticParams() {
  return ROLES.map((role) => ({ role }))
}

export default function SignupPage({
  params,
}: {
  params: { role: string }
}) {
  if (params.role !== 'company' && params.role !== 'worker') notFound()

  return <SignupForm role={params.role} />
}
