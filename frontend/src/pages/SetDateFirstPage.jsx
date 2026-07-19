import { useRef, useState } from "react";
import Layout from "../components/Layout";
import DatePickerForm from "../components/DatePickerForm";

const API = import.meta.env.VITE_API_URL || "/api";

const toYMD = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const fetchWithTimeout = (url, options, timeout) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(id),
  );
};

const SetDateFirstPage = () => {
  const [status, setStatus] = useState("idle"); // idle | saving | waking | success | error
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const inFlight = useRef(false);

  const handleSubmit = async ({ date, time }) => {
    if (inFlight.current) return;
    inFlight.current = true;

    setStatus("saving");
    setError("");

    const wakeTimer = setTimeout(() => {
      setStatus((s) => (s === "saving" ? "waking" : s));
    }, 4000);

    try {
      const res = await fetchWithTimeout(
        `${API}/date`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: toYMD(date), time }),
        },
        60000,
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Something went wrong (${res.status})`);
      }

      const saved = await res.json();
      setConfirmed(saved);
      setStatus("success");
    } catch (err) {
      const msg =
        err.name === "AbortError"
          ? "That took too long — the server may be waking up. Please try once more."
          : err.message || "Something went wrong. Please try again.";
      setError(msg);
      setStatus("error");
    } finally {
      clearTimeout(wakeTimer);
      inFlight.current = false;
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

  const isBusy = status === "saving" || status === "waking";

  return (
    <Layout>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8 leading-tight">
        🌸 When you<span className="text-red-400"> free?</span> 🌸
      </h1>

      <DatePickerForm onSubmit={handleSubmit} submitting={isBusy} />

      {status === "waking" && (
        <p className="mt-4 text-center text-sm text-gray-500">
          Waking things up… the first save can take a moment. 💤
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-center text-sm text-red-500">{error}</p>
      )}
    </Layout>
  );
};

export default SetDateFirstPage;
