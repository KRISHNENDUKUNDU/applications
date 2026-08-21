"""Store text vectors in ChromaDB and retrieve the closest labelled example."""

import chromadb
from sklearn.feature_extraction.text import CountVectorizer


# The same labelled examples used in 1.what_is_AI.py
training_texts = [
    "hello there",
    "hi how are you",
    "hey good morning",
    "what is your name",
    "how does this work",
    "why is the sky blue",
]

training_labels = [
    "greeting",
    "greeting",
    "greeting",
    "question",
    "question",
    "question",
]

# 1. Convert each text into a numeric vector.
vectorizer = CountVectorizer()
training_vectors = vectorizer.fit_transform(training_texts).toarray()

# 2. Create an in-memory vector database and store the vectors with their labels.
client = chromadb.EphemeralClient()
collection = client.get_or_create_collection(
    name="text_examples",
    metadata={"hnsw:space": "cosine"},
)

collection.add(
    ids=[f"example-{index}" for index in range(len(training_texts))],
    documents=training_texts,
    embeddings=training_vectors.tolist(),
    metadatas=[{"label": label} for label in training_labels],
)


def classify_by_similarity(text):
    """Return the label of the most similar vector stored in the vector DB."""
    query_vector = vectorizer.transform([text]).toarray().tolist()

    result = collection.query(
        query_embeddings=query_vector,
        n_results=1,
        include=["documents", "metadatas", "distances"],
    )

    closest_text = result["documents"][0][0]
    label = result["metadatas"][0][0]["label"]
    distance = result["distances"][0][0]
    return label, closest_text, distance


for new_text in [
    "hi there friend",
    "what time is it",
    "hey good evening",
    "what are you doing",
]:
    label, closest_text, distance = classify_by_similarity(new_text)
    print(f"New text:       {new_text}")
    print(f"Closest example: {closest_text}")
    print(f"Predicted label: {label}")
    print(f"Cosine distance: {distance:.3f}\n")
