import { useEffect, useState } from "react";
import {
  ArrowLeft, BedDouble, CalendarDays, Check, ChevronDown, CircleAlert,
  Clock3, FileText, Hotel, LayoutDashboard, MapPin, Menu, Plane,
  Plus, Search, Send, Utensils, X,
} from "lucide-react";

const enquiries = [
  ["Northstar Consulting", "Singapore, Kuala Lumpur", "14–19 Oct 2026", "18", "£24,680", "Aisha Khan", "New", "new"],
  ["Helix Partners", "Berlin, Prague, Vienna", "03–11 Nov 2026", "7", "£9,420", "Daniel Reed", "Quoted", "quoted"],
  ["Lumen Finance", "Tokyo", "18–25 Nov 2026", "4", "£12,860", "Maya Patel", "Partially booked", "partial"],
  ["Vertex Legal", "New York", "05–09 Dec 2026", "11", "£18,900", "Aisha Khan", "Accepted", "accepted"],
  ["Orion Manufacturing", "Dubai", "22–26 Jan 2027", "26", "£31,240", "Daniel Reed", "Fully booked", "booked"],
];

const services = [
  { icon: Plane, title: "London Heathrow → Singapore Changi", detail: "14 Oct · 21:35–17:10 +1 · Singapore Airlines · Premium Economy · 18 travellers", status: "Confirmed", tone: "confirmed", price: "£14,220" },
  { icon: Hotel, title: "The Fullerton Bay Hotel", detail: "Singapore · 5 nights · 3 rooms · Bed and breakfast", status: "Requested", tone: "requested", price: "£7,860" },
  { icon: Utensils, title: "Lau Pa Sat", detail: "Singapore · 16 Oct · 19:30 · 18 covers · Asian cuisine", status: "Draft", tone: "draft", price: "£1,080" },
];

function Status({ children, tone }) { return <span className={`status ${tone}`}>{children}</span>; }
function Button({ children, primary, onClick, className = "", type = "button" }) { return <button type={type} className={`button ${primary ? "primary" : "secondary"} ${className}`} onClick={onClick}>{children}</button>; }
function PageTitle({ eyebrow, title, description, actions }) { return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div><div className="actions">{actions}</div></div>; }

function Splash({ onDone }) {
  useEffect(() => { const timer = setTimeout(onDone, 900); return () => clearTimeout(timer); }, [onDone]);
  return <div className="splash"><div className="splash-inner"><div className="logo-mark">TD</div><h1>TripDesk</h1><p>Travel operations, clearly connected.</p><span>Preparing your workspace…</span></div></div>;
}

function Login({ onLogin }) {
  return <div className="login"><section className="login-brand"><div className="logo-mark">TD</div><h1>TripDesk</h1><p>One workspace for enquiries, quotations and supplier bookings.</p><small>Internal agents and partner agencies</small></section><section className="login-form"><h1>Welcome back</h1><p>Sign in to your TripDesk workspace</p><form onSubmit={(event) => { event.preventDefault(); onLogin(); }}><label>WORK EMAIL<input defaultValue="sarah.chen@northstar.example" /></label><label>PASSWORD<input type="password" defaultValue="password" /></label><a href="#forgot">Forgot password?</a><div className="alert error"><CircleAlert size={16} /> Wrong credentials state: check your email and password.</div><div className="alert warning"><Clock3 size={16} /> Unactivated account state: ask your administrator to activate access.</div><Button primary type="submit">Sign in</Button><small>First time here? <a href="#setup">Set up your password</a></small></form></section></div>;
}

function Sidebar({ current, navigate }) {
  const items = [["dashboard", "Dashboard", LayoutDashboard], ["enquiries", "Enquiries", FileText], ["trip", "Trip detail", MapPin], ["flights", "Flights", Plane], ["hotels", "Hotels", BedDouble], ["restaurants", "Restaurants", Utensils]];
  return <aside className="sidebar"><div className="brand"><div className="logo-mark">TD</div><b>TripDesk</b></div><nav>{items.map(([id, label, Icon]) => <button key={id} className={current === id ? "active" : ""} onClick={() => navigate(id)}><Icon size={17} />{label}</button>)}</nav><div className="user-card"><b>Sarah Chen</b><span>Internal agent · London</span><span>Partner view available</span></div></aside>;
}

function Shell({ screen, navigate, children }) {
  return <div className="app-shell"><Sidebar current={screen} navigate={navigate} /><main className="main">{children}</main></div>;
}

function Dashboard({ navigate }) {
  return <><PageTitle title="Good morning, Sarah" description="Tuesday, 25 September 2026 · What needs your attention today?" actions={<><Button primary onClick={() => navigate("enquiries")}><Plus size={16} /> New enquiry</Button><Button onClick={() => window.print()}>Export PDF</Button></>} /><div className="stats">{[["Waiting for response", "12", "3 older than 24 hours"], ["Going stale", "8", "Needs follow-up today"], ["Quotes awaiting", "14", "Client decision pending"], ["Supplier confirmation", "6", "Booking requested"]].map(([label, value, note]) => <div className="card stat" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></div>)}</div><section className="section"><div className="section-heading"><h2>Needs your attention</h2><span>8 items · Internal view</span></div><table><thead><tr><th>Enquiry</th><th>Client</th><th>Destination</th><th>Age</th><th>Status</th></tr></thead><tbody>{enquiries.slice(0, 4).map((row, index) => <tr key={row[0]} onClick={() => navigate("trip")}><td><b>TRP-104{82 - index}</b></td><td>{row[0]}</td><td>{row[1]}</td><td>{index + 1}h</td><td><Status tone={row[7]}>{row[6]}</Status></td></tr>)}</tbody></table></section><section className="section"><div className="section-heading"><h2>Partner agency view</h2><span>Narrowed access</span></div><div className="card partner-stats">{[["4", "Your open enquiries"], ["2", "Quotations awaiting decision"], ["3", "Supplier confirmations"]].map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}<p>Partners see only their own clients, quotes and bookings — not internal team workload.</p></div></section></>;
}

function Enquiries({ navigate }) {
  const [query, setQuery] = useState(""); const [status, setStatus] = useState("All");
  const rows = enquiries.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()) && (status === "All" || row[6] === status));
  return <><PageTitle title="Enquiries" description="198 open and recent enquiries · Find the right trip in seconds." actions={<><Button primary><Plus size={16} /> New enquiry</Button><Button onClick={() => window.print()}>Export PDF</Button></>} /><div className="toolbar"><label className="search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search client, destination or reference" /></label><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option>{["New", "Quoted", "Accepted", "Partially booked", "Fully booked"].map((option) => <option key={option}>{option}</option>)}</select><Button onClick={() => { setQuery(""); setStatus("All"); }}>Clear filters</Button></div>{rows.length ? <table><thead><tr>{["Client", "Destination", "Travel dates", "Travellers", "Value", "Owner", "Status"].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} onClick={() => navigate("trip")}><td><b>{row[0]}</b><small>TRP-10482</small></td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td><td>{row[5]}</td><td><Status tone={row[7]}>{row[6]}</Status></td></tr>)}</tbody></table> : <div className="card empty"><h2>No enquiries match these filters</h2><p>Try changing the status, owner, or date range.</p><Button onClick={() => { setQuery(""); setStatus("All"); }}>Clear filters</Button></div>}</>;
}

function Trip({ navigate }) {
  const [drawer, setDrawer] = useState(false); const [expanded, setExpanded] = useState(false);
  const rows = expanded ? [...services, ...Array.from({ length: 11 }, (_, i) => ({ ...services[i % 3], title: `${services[i % 3].title} · Additional arrangement ${i + 1}` }))] : services;
  return <><PageTitle eyebrow="Tripline / TRP-10482" title="Northstar Consulting" description="Singapore and Kuala Lumpur · 14–19 October 2026 · 18 travellers" actions={<><Status tone="partial">Partially booked</Status><Button primary onClick={() => setDrawer(true)}><Plus size={16} /> Add service</Button><Button onClick={() => window.print()}>Export PDF</Button></>} /><div className="trip-layout"><section className="card service-card"><div className="section-heading"><h2>Services ({rows.length})</h2><span>Grouped by itinerary date</span></div>{rows.map((service, index) => <div className="service-row" key={`${service.title}-${index}`}><div className="service-icon"><service.icon size={18} /></div><div><b>{service.title}</b><p>{service.detail}</p><Status tone={service.tone}>{service.status}</Status></div><strong className="service-price">{service.price}</strong></div>)}{!expanded && <Button onClick={() => setExpanded(true)}>Show fourteen-service state</Button>}</section><aside><div className="card side-card"><h2>Client & trip</h2><dl><dt>PRIMARY CONTACT</dt><dd>Leena Wong<br /><span>leena.wong@northstar.example</span></dd><dt>BUDGET</dt><dd>£28,000–£32,000</dd><dt>OWNER</dt><dd>Aisha Khan</dd></dl></div><div className="card side-card"><h2>Trip total</h2><div className="total-line"><span>Confirmed services</span><b>£14,220</b></div><div className="total-line"><span>Requested services</span><b>£7,860</b></div><div className="total-line"><span>Draft services</span><b>£1,080</b></div><div className="total"><span>Estimated total</span><b>£23,160</b></div><Button primary><Send size={16} /> Send quotation</Button></div></aside></div>{drawer && <><div className="overlay" onClick={() => setDrawer(false)} /><div className="drawer"><div className="drawer-heading"><h2>Add service</h2><button onClick={() => setDrawer(false)}><X /></button></div><p>Choose a service without leaving the trip.</p>{[["flights", Plane, "Flight", "Compare airline and fare options"], ["hotels", Hotel, "Hotel", "Choose a property, room and rate"], ["restaurants", Utensils, "Restaurant", "Find availability for a specific time"]].map(([id, Icon, title, description]) => <button className="service-option" key={id} onClick={() => { setDrawer(false); navigate(id); }}><Icon size={20} /><span><b>{title}</b><small>{description}</small></span></button>)}</div></>}</>;
}

function SearchPanel({ type }) {
  const fields = type === "flights" ? [["FROM", "London Heathrow"], ["TO", "Singapore Changi"], ["DEPARTURE", "14 Oct 2026"], ["PASSENGERS", "18"]] : type === "hotels" ? [["DESTINATION", "Singapore"], ["CHECK-IN", "14 Oct 2026"], ["CHECK-OUT", "19 Oct 2026"], ["ROOMS", "3"]] : [["LOCATION", "Singapore"], ["DATE", "16 Oct 2026"], ["TIME", "19:30"], ["COVERS", "18"]];
  return <div className="card search-panel">{fields.map(([label, value]) => <label key={label}>{label}<div>{value}</div></label>)}<Button primary>Search {type}</Button></div>;
}

function Flights() { return <><PageTitle eyebrow="TripDesk / Add service" title="Flights" description="Compare dense airline results, fares and connection risk." actions={<Button onClick={() => window.print()}>Export PDF</Button>} /><SearchPanel type="flights" /><div className="filters"><Status tone="new">Round trip</Status><Button>Stops: Any <ChevronDown size={14} /></Button><Button>Departure time</Button><Button>Airlines</Button><Button>Price</Button></div>{[["Singapore Airlines", "SQ317", "21:35", "17:10 +1", "13h 20m", "Direct"], ["Qatar Airways", "QR006", "14:05", "15:20 +1", "21h 15m", "1 stop · overnight"]].map((flight) => <div className="card flight-card" key={flight[1]}><div className="flight-top"><b>{flight[0]} <small>{flight[1]}</small></b><b>From £690 / passenger</b></div><div className="route"><b>{flight[2]}<small>LHR</small></b><span>━━━━━━<small>{flight[4]} · {flight[5]}</small></span><b>{flight[3]}<small>SIN</small></b></div>{flight[1] === "QR006" && <div className="alert warning"><Clock3 size={16} /> Overnight connection · Doha · 1h 35m layover</div>}<div className="fare-grid">{[["Economy", "£690", "1 checked bag · changes with fee"], ["Premium Economy", "£890", "2 checked bags · changes permitted"], ["Business", "£2,480", "Lounge access · flexible cancellation"]].map((fare, index) => <div className={`fare ${index === 1 ? "selected" : ""}`} key={fare[0]}><b>{fare[0]}</b><strong>{fare[1]}</strong><small>{fare[2]}</small><Button>Select fare</Button></div>)}</div></div>)}<div className="card empty compact"><h2>No-results state</h2><p>No flights found. Try changing the date, airport, cabin, or number of stops.</p></div></>; }

function Hotels() { return <><PageTitle eyebrow="TripDesk / Add service" title="Hotels" description="Choose the property first, then a room and board basis." actions={<Button onClick={() => window.print()}>Export PDF</Button>} /><SearchPanel type="hotels" /><p className="helper">3 rooms · 5 nights · 18 guests</p><div className="hotel-grid">{[["The Fullerton Bay Hotel", "★★★★★", "Marina Bay · 0.8 km from client venue", "9.2 Excellent"], ["Riverside Business Hotel", "★★★★", "Singapore · 1.2 km from client venue", "8.1 Good"]].map((hotel, index) => <div className="card hotel-card" key={hotel[0]}><div className={`hotel-photo ${index ? "placeholder" : ""}`}>{index ? "No photographs available" : "Property photograph"}</div><div className="hotel-content"><h2>{hotel[0]}</h2><p>{hotel[1]} <span>{hotel[2]} · {hotel[3]}</span></p><b>From £245 <small>/ room / night</small></b><div className="room"><div><b>{index ? "Room only" : "Bed and breakfast"}</b><small>{index ? "Non-refundable" : "Free cancellation until 10 Oct"}</small></div><strong>{index ? "£6,950" : "£7,860"}<small>3 rooms · 5 nights</small></strong></div><Button primary>Select room</Button></div></div>)}</div></>; }

function Restaurants() { return <><PageTitle eyebrow="TripDesk / Add service" title="Restaurants" description="Availability is the constraint. Select a workable time or mark a phone enquiry." actions={<Button onClick={() => window.print()}>Export PDF</Button>} /><SearchPanel type="restaurants" />{[["Lau Pa Sat", "Asian · Downtown Singapore · ££", "Booking available", "confirmed"], ["The Clifford Pier", "Modern Asian · Marina Bay · £££", "19:30 unavailable", "partial"], ["Palm Beach Seafood", "Seafood · Marina Bay · £££", "Telephone booking required", "requested"]].map((restaurant, index) => <div className="card restaurant" key={restaurant[0]}><div><h2>{restaurant[0]}</h2><p>{restaurant[1]}</p><Status tone={restaurant[3]}>{restaurant[2]}</Status>{index === 1 && <div className="times"><button>19:00 · 18</button><button>20:00 · 18</button><button>20:30 · 18</button></div>}{index === 2 && <p className="helper">This restaurant cannot be confirmed through TripDesk. Call the restaurant to arrange the table.</p>}</div><Button primary={index === 0}>{index === 2 ? "Mark as phone enquiry" : index === 1 ? "Select 19:00" : "Select"}</Button></div>)}</>; }

export default function App() {
  const [screen, setScreen] = useState("splash");
  const navigate = (next) => setScreen(next);
  if (screen === "splash") return <Splash onDone={() => navigate("login")} />;
  if (screen === "login") return <Login onLogin={() => navigate("dashboard")} />;
  const page = { dashboard: <Dashboard navigate={navigate} />, enquiries: <Enquiries navigate={navigate} />, trip: <Trip navigate={navigate} />, flights: <Flights />, hotels: <Hotels />, restaurants: <Restaurants /> }[screen];
  return <Shell screen={screen} navigate={navigate}>{page}</Shell>;
}
