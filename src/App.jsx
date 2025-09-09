import React, { useState } from "react";

// Secure Agile Dashboard (single-file React component)
// TailwindCSS classes used (no import required)
// Assumptions / integration points (placeholders):
// - Auth: replace mockAuth with real SSO / OAuth / SAML / OIDC integration
// - Backend: /api endpoints (projects, issues, pipeline, security) expected
// - Secure features: RBAC checks, audit logging, and secure fetch wrapper

// Mock role-based user
const mockUser = {
  id: "u123",
  name: "Shekhar",
  email: "shekhar@example.com",
  role: "admin", // roles: admin, manager, dev, auditor
};

// Simple secure fetch wrapper (placeholder)
async function secureFetch(url, opts = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const res = await fetch(url, { headers: { ...defaultHeaders, ...(opts.headers || {}) }, ...opts });
  if (!res.ok) throw new Error(`Request failed ${res.status}`);
  return res.json();
}

function useMockData() {
  const [projects] = useState([
    { id: "p1", name: "Payment Fraud Detection", resources: 12, owner: "team-alpha" },
    { id: "p2", name: "Internal Portal", resources: 6, owner: "team-beta" },
  ]);

  const [issues, setIssues] = useState([
    { id: "i1", title: "Login fails w/ 2FA", status: "To Do", priority: "High", project: "p1" },
    { id: "i2", title: "Add audit logs for file upload", status: "In Progress", priority: "Medium", project: "p1" },
    { id: "i3", title: "Harden CORS headers", status: "Done", priority: "Low", project: "p2" },
  ]);

  const createIssue = (issue) => setIssues((s) => [{ id: `i${Date.now()}`, ...issue }, ...s]);

  return { projects, issues, createIssue };
}

// --- UI Components ---
function Topbar({ user }) {
  return (
    <header className="flex items-center justify-between p-3 border-b bg-white/80 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="text-xl font-semibold">Secure Agile Dashboard</div>
        <div className="text-sm text-gray-500">(Azure-like cloud + Jira-style boards — security-first)</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">{user.email}</div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">{user.name[0]}</div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ projects, onSelectProject, selectedProject }) {
  return (
    <aside className="w-72 p-4 border-r bg-gray-50">
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Projects</div>
        <ul className="space-y-2">
          {projects.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => onSelectProject(p)}
                className={`w-full text-left p-2 rounded ${
                  selectedProject?.id === p.id ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
                }`}>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">Owner: {p.owner} • Resources: {p.resources}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
        <div className="flex flex-col gap-2">
          <button className="p-2 rounded border hover:bg-gray-100">New Issue</button>
          <button className="p-2 rounded border hover:bg-gray-100">Start Secure Scan</button>
          <button className="p-2 rounded border hover:bg-gray-100">Deploy (staging)</button>
        </div>
      </div>

      <div className="mt-auto text-xs text-gray-400 pt-4">Security-first defaults enforced: RBAC, audit, encryption</div>
    </aside>
  );
}

function KanbanBoard({ issues, onCreate }) {
  const columns = ["To Do", "In Progress", "Done"];
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const submit = () => {
    if (!title) return;
    onCreate({ title, status: "To Do", priority, project: "p1" });
    setTitle("");
    setPriority("Medium");
  };

  return (
    <div className="flex gap-4">
      {columns.map((col) => (
        <div key={col} className="flex-1 bg-white rounded p-3 shadow-sm">
          <div className="font-semibold mb-3">{col}</div>
          <div className="space-y-2">
            {issues.filter((i) => i.status === col).map((i) => (
              <div key={i.id} className="p-2 border rounded">
                <div className="flex justify-between">
                  <div className="font-medium">{i.title}</div>
                  <div className="text-xs text-gray-500">{i.priority}</div>
                </div>
                <div className="text-xs text-gray-400">{i.id}</div>
              </div>
            ))}
          </div>
          {col === "To Do" && (
            <div className="mt-3">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New issue title" className="w-full p-2 border rounded mb-2" />
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 border rounded mb-2">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button onClick={submit} className="w-full p-2 rounded bg-indigo-600 text-white">Create</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SecurityCenter() {
  const [mfa, setMfa] = useState(true);
  const [sast, setSast] = useState(true);
  const [dast, setDast] = useState(true);
  const [autoPatch, setAutoPatch] = useState(false);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="font-semibold">Security Center</div>
      <div className="text-xs text-gray-500 mb-3">Central place for security posture and controls</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 border rounded">
          <div className="text-sm font-medium">Multi-factor Auth (MFA)</div>
          <label className="inline-flex items-center mt-2">
            <input type="checkbox" checked={mfa} onChange={() => setMfa(!mfa)} className="mr-2" /> Enabled
          </label>
        </div>

        <div className="p-3 border rounded">
          <div className="text-sm font-medium">SAST / DAST</div>
          <label className="inline-flex items-center mt-2">
            <input type="checkbox" checked={sast} onChange={() => setSast(!sast)} className="mr-2" /> SAST
          </label>
          <label className="inline-flex items-center mt-2">
            <input type="checkbox" checked={dast} onChange={() => setDast(!dast)} className="mr-2" /> DAST
          </label>
        </div>

        <div className="p-3 border rounded">
          <div className="text-sm font-medium">Auto-Patch</div>
          <label className="inline-flex items-center mt-2">
            <input type="checkbox" checked={autoPatch} onChange={() => setAutoPatch(!autoPatch)} className="mr-2" /> Enabled
          </label>
        </div>
      </div>
    </div>
  );
}

function AuditLog() {
  const [logs] = useState([
    { id: 1, time: "2025-09-09 08:33:12", actor: "admin", action: "Enabled MFA for org" },
    { id: 2, time: "2025-09-08 17:02:01", actor: "ci-bot", action: "SAST scan passed (v2.1)" },
  ]);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="font-semibold mb-2">Audit Log</div>
      <div className="space-y-2">
        {logs.map((l) => (
          <div key={l.id} className="text-xs p-2 border rounded flex justify-between">
            <div>{l.time} • {l.actor}</div>
            <div className="text-gray-600">{l.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main App ---
export default function SecureAgileDashboard() {
  const user = mockUser;
  const { projects, issues, createIssue } = useMockData();
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Topbar user={user} />
      <div className="flex">
        <Sidebar projects={projects} onSelectProject={setSelectedProject} selectedProject={selectedProject} />

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-semibold">{selectedProject.name}</h2>
              <KanbanBoard issues={issues.filter((i) => i.project === selectedProject.id)} onCreate={createIssue} />
            </div>

            <div className="space-y-4">
              <SecurityCenter />
              <AuditLog />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
