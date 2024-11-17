import axios from "axios";

const API_URL = "http://localhost:3001/v1/api";

export const seedData = async () => {
  try {
    const response = await axios.get(`${API_URL}/seed_db`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data", error);
    throw error;
  }
};

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions", error);
    throw error;
  }
};

export const createQuestion = async (question) => {
  try {
    const response = await axios.post(`${API_URL}/questions`, question);
    return response.data;
  } catch (error) {
    console.error("Error creating question", error);
    throw error;
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question", error);
    throw error;
  }
};

export const updateQuestion = async (id, updatedDetails) => {
  try {
    const response = await axios.put(
      `${API_URL}/questions/${id}`,
      updatedDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting question", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, category);
    return response.data;
  } catch (error) {
    console.error("Error creating question", error);
    throw error;
  }
};
