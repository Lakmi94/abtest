export const dynamic = "force-dynamic";
export const revalidate = 0;

import { createClient } from "@supabase/supabase-js";

type ExperimentEvent = {
  id: number;
  created_at: string;
  participant_id: string | null;
  session_id: string | null;
  condition: number | null;
  event_type: string | null;
  client_timestamp: string | null;
  server_timestamp: string | null;
  time_since_page_load: number | null;
  page: string | null;
  search_query: string | null;
  product_id: string | null;
  product_name: string | null;
  product_price: number | null;
  product_label: string | null;
};

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function fetchExperimentEvents() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return {
      data: null,
      error: new Error("Missing Supabase configuration."),
      missingConfig: true,
    };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });

  const response = await supabase
    .from("experiment_events")
    .select(
      "id,created_at,participant_id,session_id,condition,event_type,client_timestamp,server_timestamp,time_since_page_load,page,search_query,product_id,product_name,product_price,product_label"
    )
    .order("created_at", { ascending: false });

  const data = response.data as ExperimentEvent[] | null;
  const error = response.error;

  return { data, error, missingConfig: false };
}

export default async function EventsDashboardPage() {
  const { data, error, missingConfig } = await fetchExperimentEvents();

  if (missingConfig) {
    return (
      <div className="min-h-screen bg-zinc-50 text-slate-900 py-16 px-4">
        <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-semibold">Experiment Data Collection</h1>
          <p className="mt-4 text-slate-600">Missing Supabase configuration.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 text-slate-900 py-16 px-4">
        <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-semibold">Experiment Data Collection</h1>
          <p className="mt-4 text-slate-600">Failed to load experiment events.</p>
          <pre className="mt-4 rounded-xl bg-slate-100 p-4 text-xs text-red-700">
            {error.message}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-4">
      <div className="max-w-7xl mx-auto rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold">Experiment Data Collection</h1>
        <p className="mt-3 text-slate-600">All logged events from the online experiment.</p>
        <p className="mt-1 text-sm text-slate-500">Refresh the page to see newly collected events.</p>

        <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full border-collapse text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase">
              <tr>
                <th className="border-b border-slate-200 px-3 py-3">ID</th>
                <th className="border-b border-slate-200 px-3 py-3">Created At</th>
                <th className="border-b border-slate-200 px-3 py-3">Participant</th>
                <th className="border-b border-slate-200 px-3 py-3">Session</th>
                <th className="border-b border-slate-200 px-3 py-3">Condition</th>
                <th className="border-b border-slate-200 px-3 py-3">Event Type</th>
                <th className="border-b border-slate-200 px-3 py-3">Client Timestamp</th>
                <th className="border-b border-slate-200 px-3 py-3">Server Timestamp</th>
                <th className="border-b border-slate-200 px-3 py-3">Time Since Load</th>
                <th className="border-b border-slate-200 px-3 py-3">Page</th>
                <th className="border-b border-slate-200 px-3 py-3">Search Query</th>
                <th className="border-b border-slate-200 px-3 py-3">Product ID</th>
                <th className="border-b border-slate-200 px-3 py-3">Product Name</th>
                <th className="border-b border-slate-200 px-3 py-3">Product Price</th>
                <th className="border-b border-slate-200 px-3 py-3">Product Label</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((event, index) => (
                <tr
                  key={event.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="border-b border-slate-200 px-3 py-2 font-medium">{event.id}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.created_at}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.participant_id ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.session_id ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.condition ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.event_type ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.client_timestamp ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.server_timestamp ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.time_since_page_load ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.page ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.search_query ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.product_id ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2 max-w-xs truncate">{event.product_name ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.product_price ?? "-"}</td>
                  <td className="border-b border-slate-200 px-3 py-2">{event.product_label ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
