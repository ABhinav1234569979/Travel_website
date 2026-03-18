import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #12356b 0%, #071633 35%, #030b1a 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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

        <h1 style={{ fontSize: "48px", margin: "20px 0 30px" }}>Booking Requests</h1>

        {bookings.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              padding: "24px",
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,0.08)"
            }}
          >
            No bookings yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "18px"
            }}
          >
            {bookings.map((booking) => (
              <div
                key={booking._id}
                style={{
                  background: "rgba(11, 22, 52, 0.78)",
                  borderRadius: "18px",
                  padding: "22px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.25)"
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: "12px" }}>{booking.destinationName}</h3>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Travel Date:</strong> {booking.travelDate}</p>
                <p><strong>Travelers:</strong> {booking.travelers}</p>
                <p style={{ color: "#cbd5e1", marginBottom: 0 }}>
                  <strong>Created:</strong> {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;
