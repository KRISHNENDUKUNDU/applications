import torch
import torch.nn as nn

# Training data: study hours
X = torch.tensor([[1.0], [2.0], [3.0], [4.0], [5.0], [6.0]])

# 0 = Fail, 1 = Pass
y = torch.tensor([[0.0], [0.0], [0.0], [1.0], [1.0], [1.0]])

# Create ANN
model = nn.Sequential(
    nn.Linear(1, 4),   # Input layer -> Hidden layer
    nn.ReLU(),
    nn.Linear(4, 1),   # Hidden layer -> Output layer
    nn.Sigmoid()
)

# Loss function and optimizer
loss_function = nn.BCELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# Training
for epoch in range(1000):
    prediction = model(X)

    loss = loss_function(prediction, y)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# Prediction for 4.5 study hours
new_data = torch.tensor([[4.5]])

result = model(new_data)

print("Probability of passing:", result.item())