
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kxbgffkszpujuserxbcq.supabase.co';
const supabaseKey = 'sb_publishable_DwBciITQCg5g5oSsekp2IA_ffRi-Do4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    const { data: trips } = await supabase.from('trips').select('id').limit(1);
    if (!trips || trips.length === 0) { console.error("No trips found"); return; }
    const tripId = trips[0].id;

    // 3. Inspect Categories
    console.log("\nInspecting 'categories' table columns...");
    const { data: catExisting } = await supabase.from('categories').select('*').limit(1);
    if (catExisting && catExisting.length > 0) {
        console.log("Found existing category. Keys:", Object.keys(catExisting[0]));
    } else {
        console.log("Categories empty. probing...");
        const { data, error } = await supabase.from('categories').insert({
            id: crypto.randomUUID(),
            name: 'CatProbe',
            trip_id: tripId,
            color: '#000000',
            icon: 'test'
        }).select().single();
        if (error) console.error("Cat Probe error", error);
        else {
            console.log("Cat Probe success. Keys:", Object.keys(data));
            await supabase.from('categories').delete().eq('id', data.id);
        }
    }
}

inspect();
