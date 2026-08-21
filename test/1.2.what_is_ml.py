from sklearn.linear_model import LinearRegression

# Training data
X = [[1000], [1500], [2000], [2500]]
y = [20, 30, 45, 50]  # Price in lakhs

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Predict price for a 1800 sq.ft house
prediction = model.predict([[1800]])

print(prediction)