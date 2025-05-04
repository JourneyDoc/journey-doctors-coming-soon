import clientPromise from '@/lib/mongo'

export async function POST(req) {
  try {
    const data = await req.json()
    const { fullName, email, role } = data

    if (!fullName || !email || !role) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const client = await clientPromise
    const db = client.db('JourneyDoctorComingSoon')
    const collection = db.collection('JourneyDoctors Waitlist')

    // Check for existing email
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    await collection.insertOne({
      fullName,
      email,
      role,
      createdAt: new Date()
    })

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully joined waitlist' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error saving to MongoDB:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('JourneyDoctorComingSoon')
    const collection = db.collection('JourneyDoctors Waitlist')

    const entries = await collection.find({}).sort({ createdAt: -1 }).toArray()
    
    return new Response(JSON.stringify(entries || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error fetching entries:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch entries' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}