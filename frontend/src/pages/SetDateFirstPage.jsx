import Layout from "../components/Layout";
import DatePickerForm from "../components/DatePickerForm";

const SetDateFirstPage = () => {
  const handleSubmit = ({ date, time }) => {
    console.log("Date set:", date, time);
    // e.g. navigate("/confirmed", { state: { date, time } });
  };

  return (
    <Layout>
      <h1 className="font-serif text-4xl font-bold text-center text-rose-900 mb-8 leading-tight">
        So... when are you free? 📝🐾
      </h1>
      <DatePickerForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default SetDateFirstPage;
