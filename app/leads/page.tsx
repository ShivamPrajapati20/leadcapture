import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

type Lead = {
  id: string
  full_name: string
  email: string
  company: string | null
  source: string
  message: string | null
  created_at: string
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LeadsPage() {
  const { data: leads, error } = await supabaseAdmin
    .from('leads')
    .select('id, full_name, email, company, source, message, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <p className="text-red-600">Failed to load leads.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>

            <Link
                href="/"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                Add Lead
            </Link>
        </div>

        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Submitted</th>
              </tr>
            </thead>

            <tbody>
              {leads && leads.length > 0 ? (
                leads.map((lead: Lead) => (
                  <tr key={lead.id} className="border-b last:border-none">
                    <td className="px-4 py-3 text-gray-900">
                      {lead.full_name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {lead.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {lead.company || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {lead.source}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {lead.message || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(lead.created_at).toLocaleString('en-US', {
                        timeZone: 'America/Chicago',
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No leads submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}