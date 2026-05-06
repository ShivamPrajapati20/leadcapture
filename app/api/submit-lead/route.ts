import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const WEBHOOK_URL = 'https://webhook-receiver-flax.vercel.app/api/lead-webhook'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const full_name = String(body.full_name || '').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const company = String(body.company || '').trim()
    const source = String(body.source || '').trim()
    const message = String(body.message || '').trim()

    //Server-side Validation
    if (!full_name || !email || !source) {
      return NextResponse.json(
        { error: 'Full name, email, and source are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const lead = {
      full_name,
      email,
      company: company || null,
      source,
      message: message || null,
    }

    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert(lead)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already exists.' },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { error: 'Unable to save lead. Please try again later.' },
        { status: 500 }
      )
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Candidate-Name': process.env.CANDIDATE_NAME || 'Shivam Prajapati',
        },
        body: JSON.stringify(data),
      })
    } catch (webhookError) {
      console.error('Webhook failed:', webhookError)
    }

    return NextResponse.json(
      { message: 'Lead submitted successfully.', lead: data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Submit lead error:', error)

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}