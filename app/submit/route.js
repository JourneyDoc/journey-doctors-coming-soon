export async function POST(req) {
    try {
      // Get form data from request
      const data = await req.json();
      
      // Validate form data
      if (!data.fullName || !data.email || !data.role) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Normally, you would store this in a database
      // For now, we'll just log it and return a success response
      console.log('Waitlist submission:', data);
      
      // You could also try to send it to Formspree as a backup
      try {
        const formspreeResponse = await fetch('https://formspree.io/f/xpwdqlaw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        console.log('Formspree response:', formspreeResponse.status);
      } catch (formspreeError) {
        console.error('Failed to submit to Formspree:', formspreeError);
        // Continue anyway since we're storing in localStorage
      }
      
      return new Response(
        JSON.stringify({ success: true, message: 'Successfully joined waitlist' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error processing waitlist submission:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to process submission' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }