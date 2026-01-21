
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kxbgffkszpujuserxbcq.supabase.co';
const supabaseKey = 'sb_publishable_DwBciITQCg5g5oSsekp2IA_ffRi-Do4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("1. Checking connection...");
    const { data: trips, error: tripError } = await supabase.from('trips').select('*').limit(1);

    if (tripError) {
        console.error("❌ Failed to fetch trips:", tripError);
        return;
    }
    console.log("✅ Connection OK. Found trips:", trips?.length);

    if (trips.length === 0) {
        console.error("❌ No trips found. Cannot test member insert.");
        return;
    }

    const tripId = trips[0].id;
    console.log("   Using Trip ID:", tripId);

    console.log("\n2. Testing Member Insert...");
    const testMember = {
        name: "TestUser_" + Date.now(),
        planned_amount: 100,
        given_amount: 50,
        trip_id: tripId,
        // Note: I am NOT sending 'id' to let DB generate it, 
        // OR generating a random UUID if DB requires it.
        // Let's try generating one to match app logic.
        id: crypto.randomUUID()
    };

    const { data, error } = await supabase.from('members').insert(testMember).select().single();

    if (error) {
        console.error("❌ INSERT FAILED:", error);
        console.log("   Possible causes: Column name mismatch, RLS, or Types.");
    } else {
        console.log("✅ INSERT SUCCESS:", data);

        // Cleanup
        console.log("   Cleaning up...");
        await supabase.from('members').delete().eq('id', data.id);
    }
}

check();
