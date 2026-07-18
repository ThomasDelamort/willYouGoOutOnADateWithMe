import Layout from "../components/Layout";
import DatePickerForm from "../components/DatePickerForm";

const SetDateFirstPage = () => {
  const handleSubmit = ({ date, time }) => {
    console.log("Date set:", date, time);
    // e.g. navigate("/confirmed", { state: { date, time } });
  };

  return (
    <Layout>
      <h1 className="text-4xl font-extrabold text-center mb-8 leading-tight">
        🌸 When you<span className="text-red-400"> free?</span> 🌸
      </h1>
      <DatePickerForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default SetDateFirstPage;
