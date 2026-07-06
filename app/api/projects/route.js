import { NextResponse } from 'next/server'
import { createPool } from '@vercel/postgres'

function getPool() {
  return createPool()
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { plan, features, description, phone } = body

    if (!plan || !phone) {
      return NextResponse.json({ error: 'plan and phone are required' }, { status: 400 })
    }

    if (phone.length < 10) {
      return NextResponse.json({ error: 'phone must be at least 10 digits' }, { status: 400 })
    }

    const result = await getPool().sql`
      INSERT INTO project_requests (plan, features, description, phone)
      VALUES (${plan}, ${features || []}, ${description || ''}, ${phone})
      RETURNING id, plan, features, description, phone, status, created_at
    `

    return NextResponse.json({ success: true, project: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await getPool().sql`
      SELECT id, plan, features, description, phone, status, created_at
      FROM project_requests
      ORDER BY created_at DESC
    `

    return NextResponse.json({ projects: result.rows })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 })
    }

    const validStatuses = ['بررسی نشده', 'رد شده', 'تایید شده']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const result = await getPool().sql`
      UPDATE project_requests SET status = ${status} WHERE id = ${id}
      RETURNING id, plan, features, description, phone, status, created_at
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, project: result.rows[0] })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}
