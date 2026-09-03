import axios from "axios";

// =========================
// ADD CATEGORY
// =========================
// export const AddCategory = async (category) => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = localStorage.getItem("token");

//     console.log("USER:", user);
//     console.log("USER ID:", user?.id);
//     console.log("TOKEN:", token ? " موجود" : "مفقود");

//     if (!user?.id) {
//       throw new Error("User ID is missing");
//     }

//     // 1️⃣ Upload image
//     const formData = new FormData();
//     formData.append("files", category.image);

//     const uploadResponse = await axios.post(
//       "http://localhost:1337/api/upload",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const imageId = uploadResponse.data[0].id;

//     console.log("IMAGE ID:", imageId);

//     // 2️⃣ Create category
//     const data = {
//       name: category.name,
//       description: category.description,
//       image: imageId,
//       manager: user.id,
//     };

//     console.log("DATA SENT:", data);

//     const response = await axios.post(
//       "http://localhost:1337/api/categories",
//       { data },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("CATEGORY CREATED:", response.data);

//     return response.data;

//   } catch (error) {
//     console.error("STATUS:", error.response?.status);
//     console.error(
//       "STRAPI ERROR:",
//       JSON.stringify(error.response?.data, null, 2)
//     );
//     console.error("MESSAGE:", error.message);

//     throw error;
//   }
// };

// =========================
export const AddCategory = async (category) => {
  try {
    // =========================
    // 1. Upload Image
    // =========================
    const formData = new FormData();

    formData.append("files", category.image);

    const uploadResponse = await axios.post(
      "http://localhost:1337/api/upload",
      formData,
    );

    const imageId = uploadResponse.data[0].id;

    console.log("Image uploaded:", imageId);

    // =========================
    // 2. Create Category
    // =========================
    const response = await axios.post("http://localhost:1337/api/categories", {
      data: {
        name: category.name,
        description: category.description,
        image: imageId,
      },
    });

    console.log("Category added:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error adding category:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// =========================
// UPDATE CATEGORY
// =========================
export const UpdateCategory = async (category) => {
  try {
    const response = await axios.put(
      `http://localhost:1337/api/categories/${category.documentId}`,
      {
        data: {
          name: category.name,
          description: category.description,
        },
      },
    );

    console.log("Category updated:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error updating category:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// =========================
// DELETE CATEGORY
// =========================
export const DeleteCategory = async (category) => {
  try {
    const response = await axios.delete(
      `http://localhost:1337/api/categories/${category.documentId}`,
    );

    console.log("Category deleted:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting category:",
      error.response?.data || error.message,
    );

    throw error;
  }
};
