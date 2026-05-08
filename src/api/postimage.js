const BASE_URL = "http://localhost:10000";

// 게시글 이미지 조회
export const getPostImages = async (postId) => {
  const response = await fetch(`${BASE_URL}/postimage/${postId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("게시글 이미지 조회 실패");
  }

  return response.json();
};

// 게시글 이미지 등록
export const createPostImage = async (postId, imageUrl) => {
  const response = await fetch(`${BASE_URL}/postimage/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      images: [
        {
          imageUrl,
          imageOrder: 0,
        }
      ]
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    console.error("게시글 이미지 등록 에러 응답:", errorData)
    throw new Error("게시글 이미지 등록 실패");
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
};


export const createPostImageFile = async (postId, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${BASE_URL}/postimage/${postId}/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("게시글 이미지 S3 다중 업로드 에러 응답:", errorData);
    throw new Error("게시글 이미지 업로드 실패");
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

// 게시글 이미지 전체 교체
export const replacePostImages = async (postId, images) => {
  const response = await fetch(`${BASE_URL}/postimage/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      images
    })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    console.error("게시글 이미지 교체 에러 응답:", errorData)
    throw new Error("게시글 이미지 교체 실패")
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null;
}