import { useState } from 'react';
import './App.css';

function App() {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      title: "Biased Recommendation Algorithm",
      description: "Algorithm consistently favored certain demographics...",
      severity: "Medium",
      reported_at: "2025-03-15T10:00:00Z",
    },
    {
      id: 2,
      title: "LLM Hallucination in Critical Info",
      description: "LLM provided incorrect safety procedure information...",
      severity: "High",
      reported_at: "2025-04-01T14:30:00Z",
    },
    {
      id: 3,
      title: "Minor Data Leak via Chatbot",
      description: "Chatbot inadvertently exposed non-sensitive user metadata...",
      severity: "Low",
      reported_at: "2025-04-10T09:00:00Z",
    },
    {
      id: 4,
      title: "Autonomous Vehicle Misinterpretation",
      description: "An autonomous vehicle incorrectly classified a road sign leading to a wrong maneuver.",
      severity: "High",
      reported_at: "2025-03-20T08:45:00Z",
    },
    {
      id: 5,
      title: "Voice Assistant Privacy Breach",
      description: "Voice assistant recorded conversations without activation phrase being spoken.",
      severity: "Medium",
      reported_at: "2025-04-05T12:15:00Z",
    },
    {
      id: 6,
      title: "Recommendation Algorithm Promoting Misinformation",
      description: "Algorithm boosted visibility of false news articles on health issues.",
      severity: "High",
      reported_at: "2025-03-25T17:20:00Z",
    },
    {
      id: 7,
      title: "Facial Recognition False Positive",
      description: "System mistakenly flagged an innocent person as a suspect at airport security.",
      severity: "Medium",
      reported_at: "2025-04-02T11:00:00Z",
    },
    {
      id: 8,
      title: "AI-Based Hiring Tool Bias",
      description: "Hiring model showed unintentional bias against candidates from certain regions.",
      severity: "High",
      reported_at: "2025-03-30T15:40:00Z",
    },
    {
      id: 9,
      title: "Medical Diagnosis AI Missed Rare Condition",
      description: "Diagnostic AI failed to detect a rare disease leading to delayed treatment.",
      severity: "High",
      reported_at: "2025-04-08T10:10:00Z",
    },
    {
      id: 10,
      title: "Chatbot Repeating Offensive Language",
      description: "Chatbot picked up and echoed offensive language from users without proper filtering.",
      severity: "Medium",
      reported_at: "2025-04-09T13:25:00Z",
    }
    
  ]);

  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [expandedIncidentId, setExpandedIncidentId] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !severity) {
      alert("Please fill in all fields!");
      return;
    }
    const newIncident = {
      id: incidents.length + 1,
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };
    setIncidents([...incidents, newIncident]);
    setTitle('');
    setDescription('');
    setSeverity('Low');
  };

  const toggleDetails = (id) => {
    if (expandedIncidentId === id) {
      setExpandedIncidentId(null);
    } else {
      setExpandedIncidentId(id);
    }
  };

  const filteredIncidents = incidents
    .filter((incident) => filter === 'All' || incident.severity === filter)
    .sort((a, b) => {
      if (sortOrder === 'Newest') {
        return new Date(b.reported_at) - new Date(a.reported_at);
      } else {
        return new Date(a.reported_at) - new Date(b.reported_at);
      }
    });

  return (
    <div className="container">
      <h1>AI Safety Incident Dashboard</h1>

      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      <ul className="incident-list">
        {filteredIncidents.map((incident) => (
          <li key={incident.id} className="incident-item">
            <div className="incident-header">
              <div>
                <strong>{incident.title}</strong> | {incident.severity} | {new Date(incident.reported_at).toLocaleString()}
              </div>
              <button className="view-details" onClick={() => toggleDetails(incident.id)}>
                {expandedIncidentId === incident.id ? 'Hide Details' : 'View Details'}
              </button>
            </div>
            {expandedIncidentId === incident.id && (
              <p className="incident-description">{incident.description}</p>
            )}
          </li>
        ))}
      </ul>

      <h2>Report New Incident</h2>
      <form className="incident-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Submit Incident</button>
      </form>
    </div>
  );
}

export default App;
