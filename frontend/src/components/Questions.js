import React, { useEffect, useState } from "react";
import "../styles/Questions.css";
import {
  getQuestions,
  updateQuestion,
  deleteQuestion,
  createQuestion,
} from "../api/apiService";

const Questions = ({ questions, setQuestions, setErrors, errors }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [editQuestion, setEditQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const addQuestion = async () => {
    if (newQuestion.trim()) {
      setLoading(true);
      try {
        const response = await createQuestion({
          question_text: newQuestion,
          master_id: 1,
        });
        setQuestions([...questions, response.data]);
        setNewQuestion("");
      } catch (error) {
        setErrors("Errors adding question", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditChange = (e) => {
    const updatedText = e.target.value;
    setEditQuestion((prev) => ({ ...prev, question_text: updatedText }));
  };

  const updateExistingQuestion = async () => {
    if (editQuestion && editQuestion.question_text.trim()) {
      setLoading(true);
      try {
        await updateQuestion(editQuestion.id, {
          question_text: editQuestion.question_text,
        });
        const updatedQuestions = questions.map((q) =>
          q.id === editQuestion.id ? editQuestion : q
        );
        setQuestions(updatedQuestions);
        setEditQuestion(null);
      } catch (error) {
        setErrors("Errors updating question", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteExistingQuestion = async (id) => {
    setLoading(true);
    try {
      await deleteQuestion(id);
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    } catch (error) {
      setErrors("Errors deleting question", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="questions">
      <h2>Manage Questions</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {editQuestion && editQuestion.id === question.id ? (
              <div>
                <input
                  type="text"
                  value={editQuestion.question_text}
                  onChange={handleEditChange}
                />
                <button onClick={updateExistingQuestion} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            ) : (
              <div>
                <span>{question.question_text}</span>
                <button onClick={() => setEditQuestion(question)}>Edit</button>
                <button
                  onClick={() => deleteExistingQuestion(question.id)}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="add-question">
        <input
          type="text"
          placeholder="Enter a new question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button onClick={addQuestion} disabled={loading}>
          {loading ? "Adding..." : "Add Question"}
        </button>
      </div>

      {errors && <div className="error">{errors}</div>}
    </div>
  );
};

export default Questions;
