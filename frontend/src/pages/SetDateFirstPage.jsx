import { useState } from "react";
import Layout from "../components/Layout";
import DatePickerForm from "../components/DatePickerForm";

// Base API URL. In dev this is blank, so calls go to "/api/date"
// and Vite proxies them to the backend. In prod, set VITE_API_URL.
const API = import.meta.env.VITE_API_URL || "/api";

// Format a Date as local YYYY-MM-DD (avoids the UTC day-shift you'd get
// from sending a raw Date, which JSON turns into a UTC timestamp).
const toYMD = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SetDateFirstPage = () => {
  const [status, setStatus] = useState("idle"); // idle | saving | success | error
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const handleSubmit = async ({ date, time }) => {
    setStatus("saving");
    setError("");

    try {
      const res = await fetch(`${API}/date`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: toYMD(date), time }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      const saved = await res.json();
      setConfirmed(saved);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  // Success screen
  if (status === "success" && confirmed) {
    const pretty = new Date(confirmed.date + "T00:00:00").toLocaleDateString(
      undefined,
      { weekday: "long", month: "long", day: "numeric", year: "numeric" },
    );
    return (
      <Layout>
        <div className="text-center py-6">
          <div className="text-5xl mb-4">💌</div>
          <h1 className="text-3xl font-extrabold mb-3">It's a date!</h1>
          <p className="text-gray-600">
            See you on{" "}
            <span className="font-semibold text-pink-600">{pretty}</span> at{" "}
            <span className="font-semibold text-pink-600">
              {confirmed.time}
            </span>
            .
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8 leading-tight">
        🌸 When you<span className="text-red-400"> free?</span> 🌸
      </h1>

      <DatePickerForm
        onSubmit={handleSubmit}
        submitting={status === "saving"}
      />

      {status === "error" && (
        <p className="mt-4 text-center text-sm text-red-500">{error}</p>
      )}
    </Layout>
  );
};

export default SetDateFirstPage;
