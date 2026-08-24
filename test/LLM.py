next_word_probs = {"the": {"cat": 0.6, "dog": 0.4}}
word = "the"
predicted = max(next_word_probs[word], key=next_word_probs[word].get)
print(predicted)