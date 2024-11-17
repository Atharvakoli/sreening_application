import React, { useState } from "react";
import "../styles/CategoryQuestions.css";

const CategoryQuestions = ({ questions }) => {
  const [data, setData] = useState([]);
  console.log(questions);

  return (
    <div className="category-questions">
      <h2>Categories & Questions</h2>
      <div className="categories-container">
        {questions.map((item, index) => (
          <div key={index} className="category-card">
            <h3>{item.master.category_name}</h3>
            <ul>
              <li>{item.question_text}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryQuestions;
