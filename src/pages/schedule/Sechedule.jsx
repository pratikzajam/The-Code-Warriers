import { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import { rtdb} from '../../config/firebase1';
import { Calendar as CalendarIcon, Clock, Activity, Users } from "lucide-react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";



const localizer = momentLocalizer(moment);

function Schedule() {
  const [practices, setPractices] = useState([]);
  const [newPractice, setNewPractice] = useState({
    title: "",
    yogaType: "",
    duration: "",
    date: "",
    time: "",
    type: "yoga",
    participants: "",
  });

  useEffect(() => {
    const practiceRef = ref(rtdb, "yogaPractices");

    onValue(practiceRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fetchedPractices = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPractices(fetchedPractices);
      } else {
        setPractices([]);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPractice((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPractice = async () => {
    if (!newPractice.title || !newPractice.date || !newPractice.time) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const practiceRef = ref(rtdb, "yogaPractices");
      const practiceData = {
        ...newPractice,
        participants: newPractice.participants.split(",").map((a) => a.trim()),
      };

      await push(practiceRef, practiceData);
      console.log("Practice session added successfully!");
      
      setNewPractice({
        title: "",
        yogaType: "",
        duration: "",
        date: "",
        time: "",
        type: "yoga",
        participants: "",
      });
    } catch (error) {
      console.error("Error adding practice session: ", error);
      alert("Failed to save practice session. Check console for details.");
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case "yoga": return "bg-purple-200";
      case "meditation": return "bg-blue-200";
      case "cardio": return "bg-green-200";
      case "strength": return "bg-red-200";
      case "pilates": return "bg-yellow-200";
      default: return "bg-gray-200";
    }
  };

  const calendarEvents = practices.map((practice) => ({
    id: practice.id,
    title: practice.title,
    start: new Date(`${practice.date}T${practice.time}:00`),
    end: moment(`${practice.date}T${practice.time}:00`).add(Number(practice.duration) || 60, "minutes").toDate(),
    type: practice.type,
  }));

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-900">Yoga & Exercise Scheduler</h1>
        <p className="text-gray-600">Plan and manage your practice sessions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule a Practice Session</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Session Title"
            value={newPractice.title}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="yogaType"
            placeholder="Yoga/Exercise Type"
            value={newPractice.yogaType}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (minutes)"
            value={newPractice.duration}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <select
            name="type"
            value={newPractice.type}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          >
            <option value="yoga">Yoga</option>
            <option value="meditation">Meditation</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength Training</option>
            <option value="pilates">Pilates</option>
          </select>
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={newPractice.date}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="time"
            name="time"
            placeholder="Time"
            value={newPractice.time}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="participants"
            placeholder="Participants (comma separated)"
            value={newPractice.participants}
            onChange={handleInputChange}
            className="p-2 border rounded w-full md:col-span-2"
          />
          <button
            onClick={handleAddPractice}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 w-full md:col-span-2"
          >
            Add Practice Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 md:p-6">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={(event) => ({
              className: getEventColor(event.type),
            })}
          />
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
            {practices.length === 0 ? (
              <p className="text-gray-500">No upcoming practice sessions.</p>
            ) : (
              practices.map((practice) => (
                <div key={practice.id} className={`p-4 rounded-lg border mb-3 ${getEventColor(practice.type)}`}>
                  <h3 className="font-medium">{practice.title}</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2" />{practice.date}</div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{practice.time}</div>
                    <div className="flex items-center"><Activity className="w-4 h-4 mr-2" />{practice.yogaType} - {practice.duration} min</div>
                    <div className="flex items-center"><Users className="w-4 h-4 mr-2" />{practice.participants?.join(", ")}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default Schedule;