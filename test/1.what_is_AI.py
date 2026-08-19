from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

# Step 1: Give the python AI examples to learn from
training_texts = [
    "hello there", "hi how are you", "hey good morning",
    "what is your name", "how does this work", "why is the sky blue"
]
training_labels = [
    "greeting", "question", "greeting",
    "question", "question", "question"
]

# Step 2: Convert text to numbers and train the model
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(training_texts)

model = LogisticRegression()
model.fit(X_train, training_labels)

# Step 3: Test it on NEW sentences it has never seen
def classify(text):
    X_test = vectorizer.transform([text])
    return model.predict(X_test)[0]

print(classify("hi there friend"))       # greeting
print(classify("what time is it"))       # question
print(classify("hey good evening"))      # greeting
print(classify("what are you doing")) 