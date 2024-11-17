import React, { useState, useEffect } from "react";
import "../styles/Category.css";
import axios from "axios"; // assuming you are using axios for API calls
import { createCategory, getCategories } from "../api/apiService";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getCategories();
        setCategories(response.categories);
      } catch (error) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await createCategory({
          category_name: newCategory,
        });

        const newCategoryData = response.data.category;

        setCategories([...categories, newCategoryData]);

        setNewCategory("");
      } catch (error) {
        setError("Failed to add category. Please try again.");
      }
    } else {
      setError("Category name cannot be empty.");
    }
  };

  return (
    <div className="category">
      <h2>Manage Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <span>{category.category_name}</span>
          </li>
        ))}
      </ul>

      {selectedCategory && (
        <div className="posts">
          <h3>Posts in Category</h3>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ul>
              {posts.map((post, index) => (
                <li key={index}>{post.title}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="add-category">
        <input
          type="text"
          placeholder="Enter a new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={() => addCategory()}>Add</button>
      </div>
    </div>
  );
};

export default Category;
