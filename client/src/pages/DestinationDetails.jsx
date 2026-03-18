import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    travelDate: "",
    travelers: "1"
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item._id === id);
        setDestination(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleBookingChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          destinationName: destination.name,
          ...bookingForm
        })
      });

      if (!res.ok) {
        throw new Error("Failed to save booking");
      }

      alert(`Booking confirmed for ${bookingForm.name} to ${destination.name}`);
      setShowModal(false);
      setBookingForm({
        name: "",
        email: "",
        travelDate: "",
        travelers: "1"
      });
    } catch (error) {
      console.error(error);
      alert("Could not save booking");
    }
  };

  if (!destination) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(circle at top, #12356b 0%, #071633 35%, #030b1a 100%)",
          color: "white",
          padding: "40px"
        }}
      >
        <p>Loading destination details...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #12356b 0%, #071633 35%, #030b1a 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
        position: "relative"
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Link
          to="/"
          style={{
            color: "#93c5fd",
            textDecoration: "none",
            fontWeight: "700"
          }}
        >
          Back to Home
        </Link>

        <div
          style={{
            marginTop: "24px",
            background: "rgba(11, 22, 52, 0.78)",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.35)"
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={destination.image}
              alt={destination.name}
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover"
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
              }}
            />
          </div>

          <div style={{ padding: "40px" }}>
            <h1 style={{ marginTop: 0, fontSize: "52px", marginBottom: "12px" }}>
              {destination.name}
            </h1>

            <p style={{ fontSize: "22px", color: "#cbd5e1", marginTop: 0 }}>
              {destination.location}
            </p>

            <p style={{ fontSize: "28px", fontWeight: "800" }}>
              Rs. {destination.price}
            </p>

            <p style={{ lineHeight: "1.8", fontSize: "18px", color: "#e5e7eb" }}>
              {destination.description}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                marginTop: "24px"
              }}
            >
              <div style={{ background: "rgba(255,255,255,0.06)", padding: "18px", borderRadius: "16px" }}>
                <h3 style={{ marginTop: 0 }}>Category</h3>
                <p style={{ marginBottom: 0 }}>{destination.category}</p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.06)", padding: "18px", borderRadius: "16px" }}>
                <h3 style={{ marginTop: 0 }}>Duration</h3>
                <p style={{ marginBottom: 0 }}>{destination.days} days</p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.06)", padding: "18px", borderRadius: "16px" }}>
                <h3 style={{ marginTop: 0 }}>Rating</h3>
                <p style={{ marginBottom: 0 }}>{destination.rating}</p>
              </div>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h2>Sample Itinerary</h2>
              <ul
                style={{
                  lineHeight: "1.9",
                  color: "#dbeafe",
                  listStylePosition: "inside",
                  paddingLeft: "0"
                }}
              >
                <li>Day 1: Arrival and local sightseeing</li>
                <li>Day 2: Main attraction visits and activities</li>
                <li>Day 3: Food, culture, and leisure exploration</li>
                <li>Day 4: Departure and optional shopping</li>
              </ul>
            </div>

            <div style={{ marginTop: "30px" }}>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  color: "white",
                  border: "none",
                  padding: "14px 22px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "700",
                  boxShadow: "0 10px 24px rgba(37,99,235,0.25)"
                }}
              >
                Start Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 50
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "rgba(11, 22, 52, 0.96)",
              borderRadius: "20px",
              padding: "26px",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.45)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px"
              }}
            >
              <h2 style={{ margin: 0 }}>Book {destination.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "transparent",
                  color: "white",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer"
                }}
              >
                ×
              </button>
            </div>

            <p style={{ color: "#cbd5e1", marginTop: 0, marginBottom: "20px" }}>
              Fill in your details to submit a booking request.
            </p>

            <form
              onSubmit={handleBookingSubmit}
              style={{
                display: "grid",
                gap: "14px"
              }}
            >
              <input
                name="name"
                placeholder="Full Name"
                value={bookingForm.name}
                onChange={handleBookingChange}
                required
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white"
                }}
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={bookingForm.email}
                onChange={handleBookingChange}
                required
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white"
                }}
              />

              <input
                name="travelDate"
                type="date"
                value={bookingForm.travelDate}
                onChange={handleBookingChange}
                required
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white"
                }}
              />

              <select
                name="travelers"
                value={bookingForm.travelers}
                onChange={handleBookingChange}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white"
                }}
              >
                <option value="1" style={{ color: "black" }}>1 Traveler</option>
                <option value="2" style={{ color: "black" }}>2 Travelers</option>
                <option value="3" style={{ color: "black" }}>3 Travelers</option>
                <option value="4" style={{ color: "black" }}>4 Travelers</option>
                <option value="5" style={{ color: "black" }}>5+ Travelers</option>
              </select>

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #22c55e)",
                  color: "white",
                  border: "none",
                  padding: "14px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "700",
                  marginTop: "6px",
                  boxShadow: "0 10px 24px rgba(34,197,94,0.25)"
                }}
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationDetails;
