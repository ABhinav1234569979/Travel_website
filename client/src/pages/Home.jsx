import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
    description: "",
    category: "",
    days: "",
    rating: ""
  });

  const fetchDestinations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/destinations");
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(destinations.map((d) => d.category).filter(Boolean))];
    return ["All", ...unique];
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(search.toLowerCase()) ||
        dest.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || dest.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [destinations, search, categoryFilter]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDestination = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      days: Number(form.days),
      rating: Number(form.rating)
    };

    try {
      const res = await fetch("http://localhost:5000/api/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Failed to add destination");
      }

      setForm({
        name: "",
        location: "",
        price: "",
        image: "",
        description: "",
        category: "",
        days: "",
        rating: ""
      });

      fetchDestinations();
      alert("Destination added successfully");
    } catch (error) {
      console.error(error);
      alert("Could not add destination");
    }
  };

  return (
    <div
      style={{
        background: "radial-gradient(circle at top, #12356b 0%, #071633 35%, #030b1a 100%)",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 48px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          background: "rgba(3, 11, 26, 0.75)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          zIndex: 10
        }}
      >
        <h2 style={{ margin: 0, letterSpacing: "0.5px" }}>Travel Explorer</h2>

        <div style={{ display: "flex", gap: "28px", color: "#dbeafe", fontWeight: "600", alignItems: "center" }}>
          <Link to="/" style={{ color: "#dbeafe", textDecoration: "none" }}>Home</Link>
          <a href="#destinations" style={{ color: "#dbeafe", textDecoration: "none" }}>Destinations</a>
          <a href="#add-destination" style={{ color: "#dbeafe", textDecoration: "none" }}>Add Destination</a>
          <Link to="/bookings" style={{ color: "#dbeafe", textDecoration: "none" }}>Bookings</Link>
        </div>
      </nav>

      <section
        style={{
          textAlign: "center",
          padding: "100px 20px 60px",
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            background: "rgba(59,130,246,0.18)",
            filter: "blur(60px)",
            margin: "0 auto -40px"
          }}
        />

        <h1
          style={{
            fontSize: "64px",
            marginBottom: "24px",
            lineHeight: "1.1",
            fontWeight: "800",
            letterSpacing: "-1.5px"
          }}
        >
          Discover Your Next Adventure
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "20px",
            maxWidth: "760px",
            margin: "0 auto 48px",
            lineHeight: "1.7"
          }}
        >
          Explore beaches, mountains, and nature escapes with a clean and modern travel website built using React, Express, and MongoDB.
        </p>

        <div
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "12px"
          }}
        >
          <a
            href="#destinations"
            style={{
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "white",
              padding: "14px 22px",
              borderRadius: "999px",
              fontWeight: "700",
              boxShadow: "0 10px 30px rgba(37,99,235,0.35)",
              textDecoration: "none"
            }}
          >
            Explore Destinations
          </a>

          <Link
            to="/bookings"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "14px 22px",
              borderRadius: "999px",
              fontWeight: "700",
              backdropFilter: "blur(10px)",
              textDecoration: "none"
            }}
          >
            View Bookings
          </Link>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "20px"
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "34px"
          }}
        >
          <input
            type="text"
            placeholder="Search by destination or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1 1 300px",
              padding: "16px 18px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.1)",
              outline: "none",
              fontSize: "16px",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.18)"
            }}
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: "16px 18px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.1)",
              outline: "none",
              fontSize: "16px",
              minWidth: "200px",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.18)"
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} style={{ color: "black" }}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "36px"
          }}
        >
          {[
            { title: "Best Prices", text: "Affordable travel packages for students and families." },
            { title: "Trusted Destinations", text: "Handpicked places with strong ratings and appeal." },
            { title: "Easy Planning", text: "Search, explore, and submit bookings in one place." }
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "rgba(255,255,255,0.06)",
                padding: "22px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.2)"
              }}
            >
              <h3 style={{ marginTop: 0 }}>{item.title}</h3>
              <p style={{ color: "#cbd5e1", marginBottom: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>

        <h2
          id="destinations"
          style={{
            marginBottom: "24px",
            fontSize: "34px",
            letterSpacing: "-0.5px"
          }}
        >
          Popular Destinations
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px"
          }}
        >
          {filteredDestinations.map((dest) => (
            <div
              key={dest._id}
              style={{
                background: "rgba(11, 22, 52, 0.78)",
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 24px 50px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.35)";
              }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                style={{
                  width: "100%",
                  height: "230px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 10px", fontSize: "34px" }}>{dest.name}</h3>
                <p style={{ margin: "0 0 10px", color: "#cbd5e1", fontSize: "18px" }}>{dest.location}</p>
                <p style={{ margin: "0 0 10px", fontWeight: "800", fontSize: "28px" }}>Rs. {dest.price}</p>
                <p style={{ margin: "0 0 12px", lineHeight: "1.7", color: "#e5e7eb", fontSize: "17px" }}>
                  {dest.description}
                </p>
                <p style={{ margin: "0 0 18px", color: "#cbd5e1", fontSize: "15px" }}>
                  Category: {dest.category} | Days: {dest.days} | Rating: {dest.rating}
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link
                    to={`/destination/${dest._id}`}
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                      color: "white",
                      textDecoration: "none",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      boxShadow: "0 10px 24px rgba(37,99,235,0.25)"
                    }}
                  >
                    Book Now
                  </Link>

                  <Link
                    to={`/destination/${dest._id}`}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "white",
                      textDecoration: "none",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: "1240px",
          margin: "70px auto 0",
          padding: "20px"
        }}
      >
        <h2
          style={{
            marginBottom: "24px",
            fontSize: "34px",
            letterSpacing: "-0.5px"
          }}
        >
          Traveler Reviews
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            marginBottom: "26px"
          }}
        >
          {[
            { name: "Rahul", review: "Goa was vibrant and relaxing. Great experience overall.", rating: "4.8/5" },
            { name: "Ananya", review: "Manali had amazing scenery and the itinerary felt exciting.", rating: "4.7/5" },
            { name: "Vikram", review: "Kerala was peaceful and scenic. Houseboat stay looked beautiful.", rating: "4.9/5" }
          ].map((item) => (
            <div
              key={item.name}
              style={{
                background: "rgba(255,255,255,0.06)",
                padding: "22px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.2)"
              }}
            >
              <h3 style={{ marginTop: 0 }}>{item.name}</h3>
              <p style={{ color: "#e5e7eb", lineHeight: "1.7" }}>{item.review}</p>
              <p style={{ color: "#93c5fd", fontWeight: "700", marginBottom: 0 }}>Rating: {item.rating}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="add-destination"
        style={{
          maxWidth: "1240px",
          margin: "20px auto 0",
          padding: "20px"
        }}
      >
        <h2
          style={{
            marginBottom: "24px",
            fontSize: "34px",
            letterSpacing: "-0.5px"
          }}
        >
          Add New Destination
        </h2>

        <form
          onSubmit={handleAddDestination}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            background: "rgba(11, 22, 52, 0.78)",
            padding: "28px",
            borderRadius: "22px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(10px)"
          }}
        >
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.08)", color: "white" }} />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required style={{ padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.08)", color: "white" }} />
          <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required style={{ padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.08)", color: "white" }} />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required style={{ padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.08)", color: "white" }} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required style={{ padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.08)", color: "white" }} />
          <input name="days" placeholder="Days" value={form.days} onChange={handleChange} required style={{ padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.08)", color: "white" }} />
          <input name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} required style={{ padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.08)", color: "white" }} />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            style={{
              gridColumn: "1 / -1",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              minHeight: "110px"
            }}
          />

          <button
            type="submit"
            style={{
              gridColumn: "1 / -1",
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "16px",
              boxShadow: "0 10px 24px rgba(34,197,94,0.25)"
            }}
          >
            Add Destination
          </button>
        </form>
      </section>

      <footer
        style={{
          textAlign: "center",
          padding: "34px 20px",
          color: "#cbd5e1"
        }}
      >
        Travel Explorer - College Project Demo
      </footer>
    </div>
  );
}

export default Home;
