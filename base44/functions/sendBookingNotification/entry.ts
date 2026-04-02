// Import the required module
import { createClientFromRequest } from '@base44/sdk';

// Define the Deno object with a type assertion
const Deno = (globalThis as any).Deno || {};

// Define the serve function
Deno.serve(async (req: Request) => {
  try {
    const client = createClientFromRequest(req);

    // Mock implementation for fetching booking data
    const booking = {
      preferred_date: '2026-04-02',
    };

    function formatTimeSlot(start: Date, end: Date): string {
      return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    const timeSlot = formatTimeSlot(
      new Date(booking.preferred_date + 'T08:00:00'),
      new Date(booking.preferred_date + 'T10:00:00')
    );

    let emailBody = '';
    emailBody += `<tr><td style='padding: 8px; font-weight: bold;'>Time Slot:</td><td style='padding: 8px;'>${timeSlot}</td></tr>`;

    return new Response(emailBody, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
});
