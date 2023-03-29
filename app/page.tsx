import { prisma } from '../lib/db'
import { inspect } from 'util'
import PrismaAdmin from '../components/prisma-admin'

export default async function Home() {
  {/* @ts-expect-error Server Component */}
  return <PrismaAdmin prisma={prisma} />
}