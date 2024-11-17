import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Questions from "./components/Questions";
import Category from "./components/Category";
import CategoryQuestions from "./components/CategoryQuestions";
import "./index.css";
import { getQuestions } from "./api/apiService";

function App() {
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data.questions);
      } catch (error) {
        setErrors("Error fetching questions", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Dashboard />
      <Questions
        questions={questions}
        setQuestions={setQuestions}
        setErrors={setErrors}
        errors={errors}
      />
      <Category />
      <CategoryQuestions questions={questions} />
    </div>
  );
}

export default App;
